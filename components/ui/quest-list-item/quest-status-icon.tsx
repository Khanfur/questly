import type { QuestStatus } from '@/lib/types/quest/quest'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface QuestStatusIconProps {
  status: QuestStatus
  className?: string
  /** If provided, renders as a button (e.g. to cycle status) instead of a static indicator. */
  onClick?: () => void
  /** Accessible label for the button variant; ignored when `onClick` isn't provided. */
  label?: string
}

const IN_PROGRESS_STYLE = {
  background: 'conic-gradient(var(--primary) 0turn 0.35turn, var(--muted) 0turn)',
}

/**
 * Small status indicator circle used in quest lists: check / partial ring / empty
 * outline. Renders as a `<button>` (e.g. to cycle status on click) when `onClick`
 * is provided, otherwise as a purely decorative `<span>`.
 */
export function QuestStatusIcon({ status, className, onClick, label }: QuestStatusIconProps) {
  if (status === 'completed') {
    const completedClassName = cn(
      'flex size-5 items-center justify-center rounded-full bg-secondary text-secondary-foreground',
      className
    )
    const icon = <Check className="size-3" strokeWidth={3} />

    return onClick ? (
      <button type="button" onClick={onClick} aria-label={label} className={completedClassName}>
        {icon}
      </button>
    ) : (
      <span className={completedClassName} aria-hidden="true">
        {icon}
      </span>
    )
  }

  if (status === 'in-progress') {
    const inProgressClassName = cn('size-5 rounded-full bg-muted', className)

    return onClick ? (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={inProgressClassName}
        style={IN_PROGRESS_STYLE}
      />
    ) : (
      <span className={inProgressClassName} style={IN_PROGRESS_STYLE} aria-hidden="true" />
    )
  }

  const notStartedClassName = cn(
    'size-5 rounded-full border-2 border-muted-foreground/40',
    className
  )

  return onClick ? (
    <button type="button" onClick={onClick} aria-label={label} className={notStartedClassName} />
  ) : (
    <span className={notStartedClassName} aria-hidden="true" />
  )
}
