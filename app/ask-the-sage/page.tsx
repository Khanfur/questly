'use client'

import { useRef, useState } from 'react'

import { MessageId, sageMessages } from '@/lib/fixtures'
import { useAccountDetails } from '@/lib/hooks/use-account-details'
import { useDiaryProgress } from '@/lib/hooks/use-diary-progress'
import { useQuestProgress } from '@/lib/hooks/use-quest-progress'
import { ChatRole, type ChatMessage as ChatMessageType, type SageContext, type SageSuggestion } from '@/lib/types/sage'
import { Send } from 'lucide-react'

import { ChatMessage } from '@/components/ui/chat-message/chat-message'
import { PageHero } from '@/components/ui/page-hero/page-hero'
import { SectionDivider } from '@/components/ui/section-divider/section-divider'
import { Button } from '@/components/ui/shadcn/button'
import { Textarea } from '@/components/ui/shadcn/textarea'

export default function AskTheSagePage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    sageMessages.find((msg) => msg.id === MessageId.greeting)!,
  ])
  const [draft, setDraft] = useState('')
  const [isSending, setIsSending] = useState(false)
  const nextId = useRef(messages.length)

  const { hiscores, hiscoresHydrated } = useAccountDetails()
  const { statusByQuest, questsHydrated } = useQuestProgress()
  const { completedByTask, diaryProgressHydrated } = useDiaryProgress()

  async function requestSageReply(message: string): Promise<string> {
    const fallback = sageMessages.find((msg) => msg.id === MessageId.fallback)!.text
    try {
      const context: SageContext = {
        hiscores: hiscores ?? undefined,
        questProgress: Object.keys(statusByQuest).length > 0 ? statusByQuest : undefined,
        diaryProgress: Object.keys(completedByTask).length > 0 ? completedByTask : undefined,
      }

      const response = await fetch('/api/sage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, context }),
      })

      const data = (await response.json()) as { reply?: string; error?: string }
      if (!response.ok || data.error) {
        return fallback
      }

      return data.reply?.trim() || fallback
    } catch {
      return fallback
    }
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isSending) return

    const userMessage: ChatMessageType = {
      id: `msg-${nextId.current++}`,
      role: ChatRole.USER,
      text: trimmed,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsSending(true)

    const sageReply = await requestSageReply(trimmed)
    const sageMessage: ChatMessageType = {
      id: `msg-${nextId.current++}`,
      role: ChatRole.SAGE,
      text: sageReply,
    }

    setMessages((prev) => [...prev, sageMessage])
    setIsSending(false)
  }

  async function submitDraft() {
    await sendMessage(draft)
    setDraft('')
  }

  async function handleSelectSuggestion(suggestion: SageSuggestion) {
    await sendMessage(suggestion.label)
  }

  return (
    <>
      <PageHero
        eyebrow="Ask the Sage"
        titleLines={['Wisdom, on tap.', "Mostly accurate, and won't judge. Much."]}
        description="Task advice, quest order, gear upgrades — ask away. The Sage is a work in progress, so answers are canned for now, but the parchment's always open."
        className="mb-8"
      />

      <SectionDivider className="mb-8" />

      <div className="mx-auto flex w-full flex-col rounded-sm border border-muted-foreground/35 bg-sidebar">
        <div className="flex flex-col gap-4 px-5 py-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} isLoading={isSending && message.role === 'sage' && message === messages[messages.length - 1]} />
          ))}
          {isSending && messages[messages.length - 1]?.role === 'user' && (
            <ChatMessage
              message={{ id: 'loading', role: 'sage', text: '' }}
              isLoading={true}
            />
          )}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            void submitDraft()
          }}
          className="flex items-end gap-2 border-t border-muted-foreground/20 px-5 py-4"
        >
          <Textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                void submitDraft()
              }
            }}
            placeholder="Ask the Sage anything…"
            className="min-h-10 flex-1 bg-background"
            aria-label="Message"
            disabled={isSending}
          />
          <Button type="submit" size="icon" aria-label="Send message" disabled={isSending || !draft.trim()}>
            <Send />
          </Button>
        </form>
      </div>
    </>
  )
}
