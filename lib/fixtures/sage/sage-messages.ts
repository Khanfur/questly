import { ChatMessage, ChatRole } from '@/lib/types/sage';

export const MessageId = {
  greeting: 'greeting',
  fallback: 'fallback',
}

export type MessageId = (typeof MessageId)[keyof typeof MessageId]

export const sageMessages: ChatMessage[] = [
  {
    id: MessageId.greeting,
    role: ChatRole.SAGE,
    text: "Back again? Ask me anything — task advice, quest order, gear upgrades. I won't judge. Much.",
  },
  {
    id: MessageId.fallback,
    role: ChatRole.SAGE,
    text: 'The Sage is taking a brief breather. Ask again later.',
  },
]
