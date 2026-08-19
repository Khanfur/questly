'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

type ViewToggleItem = { readonly href: string; readonly label: string }

interface ViewToggleProps {
  items: readonly ViewToggleItem[]
  className?: string
}

/**
 * Segmented pill switcher between sibling views, e.g. "Quest Log" / "Achievement Diaries".
 * Highlights the item matching the current route.
 */
export function ViewToggle({ items, className }: ViewToggleProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        'inline-flex flex-wrap justify-center gap-1 rounded-full border border-border bg-card p-1',
        className
      )}
    >
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'label rounded-full px-4 py-2 text-muted-foreground transition-colors hover:text-foreground',
              isActive && 'bg-primary text-primary-foreground hover:text-primary-foreground'
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}
