export type SageSuggestion = {
  id: string
  label: string
}

export type ChatRole = 'sage' | 'user'

export type ChatMessage = {
  id: string
  role: ChatRole
  text: string
}
