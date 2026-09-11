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
