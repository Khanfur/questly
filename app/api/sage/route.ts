import { SAGE_SYSTEM_PROMPT } from '@/lib/ai/sage-prompt'
import { MessageId, sageMessages } from '@/lib/fixtures'
import type { SageContext } from '@/lib/types/sage'

const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL ?? 'claude-3-5-sonnet-20241022'

function getFallbackReply() {
  return (
    sageMessages.find((message) => message.id === MessageId.fallback)?.text ??
    'The Sage is taking a brief breather. Ask again later.'
  )
}

function formatSageContext(context: SageContext): string {
  const parts: string[] = []

  if (context.hiscores) {
    parts.push('=== HISCORES ===')
    const skills = Object.entries(context.hiscores)
      .map(([skill, value]) => `${skill}: ${value}`)
      .join(', ')
    if (skills) parts.push(skills)
  }

  if (context.questProgress) {
    const completedQuests = Object.entries(context.questProgress)
      .filter(([, status]) => status === 'completed')
      .map(([name]) => name)

    const inProgressQuests = Object.entries(context.questProgress)
      .filter(([, status]) => status === 'in-progress')
      .map(([name]) => name)

    if (completedQuests.length > 0 || inProgressQuests.length > 0) {
      parts.push('\n=== QUEST PROGRESS ===')
      if (completedQuests.length > 0) {
        parts.push(`Completed: ${completedQuests.join(', ')}`)
      }
      if (inProgressQuests.length > 0) {
        parts.push(`In Progress: ${inProgressQuests.join(', ')}`)
      }
    }
  }

  if (context.diaryProgress) {
    const completedTasks = Object.entries(context.diaryProgress)
      .filter(([, completed]) => completed)
      .map(([key]) => key)

    if (completedTasks.length > 0) {
      parts.push(`\n=== DIARY PROGRESS ===`)
      parts.push(`Completed Tasks: ${completedTasks.length}`)
      if (completedTasks.length <= 20) {
        parts.push(completedTasks.join(', '))
      }
    }
  }

  return parts.length > 0 ? parts.join('\n') : ''
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}))
  const message = typeof payload.message === 'string' ? payload.message.trim() : ''
  const context = (
    typeof payload.context === 'object' && payload.context !== null ? payload.context : {}
  ) as SageContext

  if (!message) {
    return Response.json({ error: 'Missing message' }, { status: 400 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return Response.json(
      { reply: getFallbackReply(), source: 'fallback', error: 'Missing ANTHROPIC_API_KEY' },
      { status: 200 }
    )
  }

  const contextString = formatSageContext(context)
  const messageContent = contextString
    ? `Player Context:\n${contextString}\n\nPlayer Question: ${message}`
    : message

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 500,
      system: SAGE_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: messageContent }],
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Anthropic request failed', response.status, errorText)
    return Response.json(
      {
        reply: getFallbackReply(),
        source: 'fallback',
        error: errorText || `Anthropic request failed: ${response.status}`,
      },
      { status: 502 }
    )
  }

  const data = (await response.json()) as {
    content?: Array<{ type?: string; text?: string }>
  }

  const reply = data.content?.find((part) => part.type === 'text')?.text?.trim()
  if (!reply) {
    return Response.json(
      {
        reply: getFallbackReply(),
        source: 'fallback',
        error: 'Anthropic returned an empty response.',
      },
      { status: 502 }
    )
  }

  return Response.json({ reply, source: 'claude' }, { status: 200 })
}
