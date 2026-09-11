import { sageFallbackReplies } from '@/lib/fixtures'
import { SAGE_SYSTEM_PROMPT } from '@/lib/ai/sage-prompt'

const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL ?? 'claude-3-5-sonnet-20241022'

function stableReplyIndex(input: string) {
  const total = Array.from(input).reduce((sum, character) => sum + character.charCodeAt(0), 0)
  return total % sageFallbackReplies.length
}

function getFallbackReply(message: string) {
  const normalized = message.trim().toLowerCase()

  if (!normalized) return 'The Sage is taking a brief breather. Ask again when your parchment is ready.'

  if (normalized.includes('chat') || normalized.includes('hello') || normalized.includes('hi')) {
    return "Fine by me. Slow day in Gielinor — even the Wise Old Man's run out of gossip."
  }

  if (normalized.includes('quest') && (normalized.includes('point') || normalized.includes('pp'))) {
    return "Legends' Quest is calling your name — high requirements, sure, but you're a stone's throw away. Knock out Waterfall Quest and Heroes' Quest first to clear the path."
  }

  if (
    normalized.includes('gear') ||
    normalized.includes('weapon') ||
    normalized.includes('attack') ||
    normalized.includes('strength') ||
    normalized.includes('defence') ||
    normalized.includes('magic') ||
    normalized.includes('ranged')
  ) {
    return 'At your combat level, a Rune crossbow with Broad bolts and a Fire cape go a long way. Save up for a Trident once your Magic catches up.'
  }

  return sageFallbackReplies[stableReplyIndex(normalized)]
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}))
  const message = typeof payload.message === 'string' ? payload.message.trim() : ''

  if (!message) {
    return Response.json({ error: 'Missing message' }, { status: 400 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    return Response.json(
      {
        reply: getFallbackReply(message),
        source: 'fallback',
      },
      { status: 200 }
    )
  }

  try {
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
        messages: [{ role: 'user', content: message }],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || `Anthropic request failed: ${response.status}`)
    }

    const data = (await response.json()) as {
      content?: Array<{ type?: string; text?: string }>
    }

    const reply = data.content?.find((part) => part.type === 'text')?.text?.trim()

    if (!reply) {
      throw new Error('Anthropic returned an empty response.')
    }

    return Response.json({ reply, source: 'claude' }, { status: 200 })
  } catch (error) {
    return Response.json(
      {
        reply: getFallbackReply(message),
        source: 'fallback',
        error: (error as Error).message,
      },
      { status: 200 }
    )
  }
}
