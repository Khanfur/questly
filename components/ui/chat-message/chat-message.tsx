import type { ChatMessage as ChatMessageType } from '@/lib/types/sage'
import { cn } from '@/lib/utils'

import { ChatHead, type ConnectionStatus } from '@/components/ui/chat-head/chat-head'

interface ChatMessageProps {
  message: ChatMessageType
  sageName?: string
  avatar?: string
  fallbackAvatar?: string
  status?: ConnectionStatus
  isLoading?: boolean
  className?: string
}

/** A single bubble in the /ask-the-sage transcript — Sage on the left with a chat head, player on the right. */
function ChatMessage({
  message,
  sageName = 'The Sage',
  avatar = '/the_sage_avatar.png',
  fallbackAvatar = '🧙',
  status = 'online',
  isLoading = false,
  className,
}: ChatMessageProps) {
  const isSage = message.role === 'sage'

  return (
    <div className={cn('flex gap-3', !isSage && 'flex-row-reverse', className)}>
      {isSage && (
        <ChatHead
          avatar={avatar}
          fallbackAvatar={fallbackAvatar}
          status={status}
          size="sm"
          className="shrink-0"
        />
      )}
      <div className={cn('flex max-w-[80%] flex-col', !isSage && 'items-end')}>
        <span className="label text-secondary">{isSage ? sageName : 'You'}</span>
        <div
          className={cn(
            'mt-1 rounded-sm px-3 py-2 text-sm',
            isSage ? 'bg-sidebar text-foreground' : 'bg-primary text-primary-foreground'
          )}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span>The Sage is thinking</span>
              <span className="inline-flex gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-current animate-pulse delay-100" />
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-current animate-pulse delay-200" />
              </span>
            </div>
          ) : (
            <div className="space-y-2 whitespace-pre-line">{message.text}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export { ChatMessage }
export type { ChatMessageProps }
