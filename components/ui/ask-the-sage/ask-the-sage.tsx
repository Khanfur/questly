'use client'

import * as React from 'react'

import type { SageSuggestion } from '@/lib/types/sage'
import { cn } from '@/lib/utils'
import { MessageCircle } from 'lucide-react'

import { ChatHead, type ConnectionStatus } from '@/components/ui/chat-head/chat-head'
import { Button } from '@/components/ui/shadcn/button'

interface AskTheSageProps {
  sageName?: string
  avatar?: string
  fallbackAvatar?: string
  status?: ConnectionStatus
  message: React.ReactNode
  suggestions: SageSuggestion[]
  continueLabel?: string
  openChatLabel?: string
  onContinue?: () => void
  onSelectSuggestion?: (suggestion: SageSuggestion) => void
  onOpenChat?: () => void
  className?: string
}

function AskTheSage({
  sageName = 'The Sage',
  avatar = '/the_sage_avatar.png',
  fallbackAvatar = '🧙',
  status = 'online',
  message,
  suggestions,
  continueLabel = 'Click here to continue',
  openChatLabel = 'Open chat with the Sage',
  onContinue,
  onSelectSuggestion,
  onOpenChat,
  className,
}: AskTheSageProps) {
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="flex w-full max-w-2xl items-center gap-3">
        <div className="h-px flex-1 bg-border" aria-hidden="true" />
        <span className="section-heading">Ask the Sage</span>
        <div className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <div className="w-full max-w-2xl rounded-sm border border-muted-foreground/35 bg-sidebar px-5 py-4">
        <div className="flex gap-3">
          <ChatHead
            avatar={avatar}
            fallbackAvatar={fallbackAvatar}
            status={status}
            size="lg"
            className="shrink-0"
          />
          <div className="flex flex-1 flex-col">
            <span className="label text-secondary">{sageName}</span>
            <p className="mt-1 text-sm text-foreground">{message}</p>
            {onContinue && (
              <button
                type="button"
                onClick={onContinue}
                className="mt-1 self-end text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {continueLabel} ▸
              </button>
            )}
          </div>
        </div>

        {suggestions.length > 0 && (
          <ol className="mt-3 flex flex-col gap-1.5 border-t border-muted-foreground/20 pt-3">
            {suggestions.map((suggestion, index) => (
              <li key={suggestion.id}>
                <button
                  type="button"
                  onClick={() => onSelectSuggestion?.(suggestion)}
                  className="flex gap-2 text-left text-sm text-foreground transition-colors hover:text-primary"
                >
                  <span className="font-semibold text-primary">{index + 1}</span>
                  {suggestion.label}
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>

      <Button size="lg" onClick={onOpenChat}>
        <MessageCircle />
        {openChatLabel}
      </Button>
    </div>
  )
}

export { AskTheSage }
export type { AskTheSageProps }
