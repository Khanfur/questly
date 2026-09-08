import type { ChatMessage as ChatMessageType } from '@/lib/types/sage'
import { cn } from '@/lib/utils'

import { ChatHead, type ConnectionStatus } from '@/components/ui/chat-head/chat-head'

interface ChatMessageProps {
  message: ChatMessageType
  sageName?: string
  avatar?: string
  fallbackAvatar?: string
  status?: ConnectionStatus
  className?: string
}

/** A single bubble in the /ask-the-sage transcript — Sage on the left with a chat head, player on the right. */
function ChatMessage({
  message,
  sageName = 'The Sage',
  avatar = '/the_sage_avatar.png',
  fallbackAvatar = '🧙',
  status = 'online',
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
        <p
          className={cn(
            'mt-1 rounded-sm px-3 py-2 text-sm',
            isSage ? 'bg-sidebar text-foreground' : 'bg-primary text-primary-foreground'
          )}
        >
          {message.text}
        </p>
      </div>
    </div>
  )
}

export { ChatMessage }
export type { ChatMessageProps }
