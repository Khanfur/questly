import * as React from 'react'

import { cn } from '@/lib/utils'

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/shadcn/avatar'

type ConnectionStatus = 'online' | 'offline' | 'away'

const STATUS_STYLES: Record<ConnectionStatus, string> = {
  online: 'bg-chart-3',
  offline: 'bg-destructive',
  away: 'bg-primary',
}

interface ChatHeadProps extends Omit<React.ComponentProps<typeof Avatar>, 'children'> {
  avatar: string
  fallbackAvatar: string
  status: ConnectionStatus
}

function ChatHead({ avatar, fallbackAvatar, status, className, ...props }: ChatHeadProps) {
  return (
    <Avatar className={className} {...props}>
      <AvatarImage src={avatar} alt="" />
      <AvatarFallback>{fallbackAvatar}</AvatarFallback>
      <AvatarBadge className={cn(STATUS_STYLES[status])} />
    </Avatar>
  )
}

export { ChatHead }
export type { ConnectionStatus }
