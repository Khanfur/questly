import { cn } from '@/lib/utils'

interface StatCardGroupProps {
  className?: string
  children: import('react').ReactNode
}

/**
 * Responsive layout wrapper for a row of `StatCard`s.
 * Stacks full-width on mobile and lays out as an evenly-sized row from `sm` up.
 */
export function StatCardGroup({ className, children }: StatCardGroupProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-3 sm:flex sm:flex-row sm:justify-center', className)}>
      {children}
    </div>
  )
}
