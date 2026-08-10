'use client'

import { useSyncExternalStore } from 'react'

import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'
import { Laptop, Moon, Sun } from 'lucide-react'

const THEME_OPTIONS = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Laptop },
] as const

const emptySubscribe = () => () => {}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  // Avoid rendering theme-dependent state until mounted to prevent hydration mismatch.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center gap-1 rounded-lg border border-input bg-transparent p-1 dark:bg-input/30 w-fit"
    >
      {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
        const isSelected = mounted && theme === value

        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={label}
            onClick={() => setTheme(value)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
              isSelected && 'bg-primary text-primary-foreground'
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        )
      })}
    </div>
  )
}
