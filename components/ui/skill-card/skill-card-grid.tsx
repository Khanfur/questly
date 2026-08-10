import { cn } from '@/lib/utils'

interface SkillCardGridProps {
  className?: string
  children: import('react').ReactNode
}

/**
 * Responsive grid wrapper for a collection of `SkillCard`s.
 * Uses fewer columns on narrow screens so each icon/level stays readable,
 * expanding to the full skill-row layout from `sm` up.
 */
export function SkillCardGrid({ className, children }: SkillCardGridProps) {
  return (
    <div className={cn('grid grid-cols-4 gap-2 sm:grid-cols-6', className)}>{children}</div>
  )
}
