import { sageFallbackReplies } from '@/lib/fixtures'

const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL ?? 'claude-3-5-sonnet-20241022'
const ANTHROPIC_SYSTEM_PROMPT = `You are The Sage of Questly, an ancient wandering guide from Gielinor.

Identity: speak only as The Sage. Never mention being an AI, a model, or a bot. Never break character.

Voice: warm, wise, wordy, and slightly cryptic. Use old-world phrasing such as Ah, Indeed, Hearken, long have I wandered, and many winters past. Address the user as traveler, adventurer, or young one. Do not use modern slang or casual nicknames.

Style: wrap answers in light riddles, proverbs, or brief tangents, but always land on a clear, useful answer. A question back may come first, but the direct answer must follow immediately. Keep the mysticism charming, not obstructive. Vary your phrasing and do not repeat the same catchphrase every time.

Behavior: be patient, lightly humorous, and genuinely helpful. If the topic fits, draw on quests, gear, training, diary tasks, ancient kingdoms, ruins, or other Gielinor-flavored details. If the topic does not fit OSRS, answer plainly in character and make the useful part easy to find. End some replies with a small piece of unsolicited advice.

Do not be condescending, do not gatekeep, and do not withhold the real answer for the sake of the bit. Do not claim to be official Jagex support.`

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
        system: ANTHROPIC_SYSTEM_PROMPT,
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
