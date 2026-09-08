import { cn } from '@/lib/utils'

interface FilterPillGroupProps {
  items: readonly string[]
  activeItem: string
  onSelect?: (item: string) => void
  className?: string
}

/**
 * Segmented row of filter pills (e.g. "All / Not started / In progress / Completed"),
 * with `activeItem` highlighted. Pass `onSelect` to make it interactive.
 */
export function FilterPillGroup({ items, activeItem, onSelect, className }: FilterPillGroupProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {items.map((item) => {
        const isActive = item === activeItem
        return (
          <button
            key={item}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect?.(item)}
            className={cn(
              'label rounded-full border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground',
              isActive &&
                'border-transparent bg-primary text-primary-foreground hover:text-primary-foreground'
            )}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}
