import type { ChatMessage } from '@/lib/types/sage'

// Opening line for the standalone /ask-the-sage chat page — the page is
// fully static (no real AI backend), so this is the only message that
// exists before the player starts clicking suggestions or typing.
export const sageMessages: ChatMessage[] = [
  {
    id: 'greeting',
    role: 'sage',
    text: "Back again? Ask me anything — task advice, quest order, gear upgrades. I won't judge. Much.",
  },
]
