import type { QuestStatus } from '@/lib/types/quest'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface QuestStatusIconProps {
  status: QuestStatus
  className?: string
}

/** Small status indicator circle used in quest lists: check / partial ring / empty outline. */
export function QuestStatusIcon({ status, className }: QuestStatusIconProps) {
  if (status === 'completed') {
    return (
      <span
        className={cn(
          'flex size-5 items-center justify-center rounded-full bg-secondary text-secondary-foreground',
          className
        )}
        aria-hidden="true"
      >
        <Check className="size-3" strokeWidth={3} />
      </span>
    )
  }

  if (status === 'in-progress') {
    return (
      <span
        className={cn('size-5 rounded-full bg-muted', className)}
        style={{ background: 'conic-gradient(var(--primary) 0turn 0.35turn, var(--muted) 0turn)' }}
        aria-hidden="true"
      />
    )
  }

  return (
    <span
      className={cn('size-5 rounded-full border-2 border-muted-foreground/40', className)}
      aria-hidden="true"
    />
  )
}
