'use client'

import { useRef, useState } from 'react'

import { sageFallbackReplies, sageMessages, sageReplies, sageSuggestions } from '@/lib/fixtures'
import type { ChatMessage as ChatMessageType, SageSuggestion, ChatRole } from '@/lib/types/sage'
import { Send } from 'lucide-react'

import { ChatHead } from '@/components/ui/chat-head/chat-head'
import { ChatMessage } from '@/components/ui/chat-message/chat-message'
import { PageHero } from '@/components/ui/page-hero/page-hero'
import { SectionDivider } from '@/components/ui/section-divider/section-divider'
import { Button } from '@/components/ui/shadcn/button'
import { Textarea } from '@/components/ui/shadcn/textarea'

// The Sage has no real AI backend yet — this page is a static, fixture-driven
// chat transcript. Suggestion chips return a canned reply from sageReplies,
// while free-typed messages cycle through sageFallbackReplies in order (kept
// deterministic rather than random so the page renders predictably in tests).
export default function AskTheSagePage() {
  const [messages, setMessages] = useState<ChatMessageType[]>(sageMessages)
  const [draft, setDraft] = useState('')
  const nextId = useRef(messages.length)
  const fallbackIndex = useRef(0)

  function reply(userText: string, suggestionId?: string): string {
    if (suggestionId && sageReplies[suggestionId]) return sageReplies[suggestionId]

    const fallback = sageFallbackReplies[fallbackIndex.current % sageFallbackReplies.length]
    fallbackIndex.current += 1
    return fallback
  }

  function sendMessage(text: string, suggestionId?: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMessage: ChatMessageType = {
      id: `msg-${nextId.current++}`,
      role: ChatRole.USER,
      text: trimmed,
    }
    const sageMessage: ChatMessageType = {
      id: `msg-${nextId.current++}`,
      role: ChatRole.SAGE,
      text: reply(trimmed, suggestionId),
    }

    setMessages((prev) => [...prev, userMessage, sageMessage])
  }

  function submitDraft() {
    sendMessage(draft)
    setDraft('')
  }

  function handleSelectSuggestion(suggestion: SageSuggestion) {
    sendMessage(suggestion.label, suggestion.id)
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
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-muted-foreground/20 px-5 py-3">
          {sageSuggestions.map((suggestion) => (
            <Button
              key={suggestion.id}
              type="button"
              size="sm"
              variant="outline"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion.label}
            </Button>
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            submitDraft()
          }}
          className="flex items-end gap-2 border-t border-muted-foreground/20 px-5 py-4"
        >
          <Textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                submitDraft()
              }
            }}
            placeholder="Ask the Sage anything…"
            className="min-h-10 flex-1 bg-background"
            aria-label="Message"
          />
          <Button type="submit" size="icon" aria-label="Send message">
            <Send />
          </Button>
        </form>
      </div>
    </>
  )
}
