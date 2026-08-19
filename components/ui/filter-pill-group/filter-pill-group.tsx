import { cn } from '@/lib/utils'

interface FilterPillGroupProps {
  items: readonly string[]
  activeItem: string
  className?: string
}

/**
 * Static row of segmented filter pills (e.g. "All / Not started / In progress / Completed"),
 * with `activeItem` highlighted. Presentational only — wire up `onClick` per item when this
 * page gains real filtering.
 */
export function FilterPillGroup({ items, activeItem, className }: FilterPillGroupProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {items.map((item) => {
        const isActive = item === activeItem
        return (
          <span
            key={item}
            className={cn(
              'label rounded-full border border-border px-3 py-1.5 text-muted-foreground',
              isActive && 'border-transparent bg-primary text-primary-foreground'
            )}
          >
            {item}
          </span>
        )
      })}
    </div>
  )
}
