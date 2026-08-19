'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 * Persists state to `localStorage`, keeping the in-memory value in sync
 * across renders and other tabs/windows via the `storage` event.
 *
 * SSR-safe: reads/writes are guarded so this can be imported in code that
 * also runs on the server (the initial render always returns
 * `defaultValue`, then syncs to the stored value once mounted).
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((previous: T) => T)) => void] {
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      const stored = window.localStorage.getItem(key)
      if (stored !== null) {
        // Resetting to the persisted value is intentionally synchronous here
        // — there's no async work to defer it into.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(JSON.parse(stored) as T)
      }
    } catch {
      // Ignore malformed/inaccessible storage and fall back to defaultValue.
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) return

      try {
        setValue(event.newValue !== null ? (JSON.parse(event.newValue) as T) : defaultValue)
      } catch {
        // Ignore malformed storage updates.
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const setStoredValue = useCallback(
    (next: T | ((previous: T) => T)) => {
      setValue((previous) => {
        const resolved = next instanceof Function ? next(previous) : next

        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(key, JSON.stringify(resolved))
          } catch {
            // Ignore write failures (e.g. storage disabled/full).
          }
        }

        return resolved
      })
    },
    [key]
  )

  return [value, setStoredValue]
}
