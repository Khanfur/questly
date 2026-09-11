import type { OsrsHiscores } from '@/lib/types/osrs-hiscores'
import type { QuestStatus } from '@/lib/types/quest'

export type SageSuggestion = {
  id: string
  label: string
}

export const ChatRole = {
  SAGE: 'sage',
  USER: 'user',
}

export type ChatRole = (typeof ChatRole)[keyof typeof ChatRole]

export type ChatMessage = {
  id: string
  role: ChatRole
  text: string
}

export type SageContext = {
  hiscores?: OsrsHiscores | null
  questProgress?: Record<string, QuestStatus>
  diaryProgress?: Record<string, boolean>
}
