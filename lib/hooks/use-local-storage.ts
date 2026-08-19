'use client'

import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

// `useLayoutEffect` warns when it runs during SSR (it has no effect there),
// so fall back to `useEffect` on the server and only use the layout variant
// in the browser, where it fires synchronously before paint.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Persists state to `localStorage`, keeping the in-memory value in sync
 * across renders and other tabs/windows via the `storage` event.
 *
 * SSR-safe: reads/writes are guarded so this can be imported in code that
 * also runs on the server (the initial render always returns
 * `defaultValue`). The stored value is read back in a layout effect (rather
 * than a regular effect) so it's applied before the browser paints.
 *
 * Note this only prevents flashes caused by React's own render timing. Pages
 * using this hook are commonly prerendered/static, so the very first paint
 * (before the JS bundle has hydrated) still shows `defaultValue` baked into
 * the HTML. The returned `isHydrated` flag lets callers avoid displaying
 * that placeholder as if it were real data — e.g. by rendering a skeleton
 * until `isHydrated` is `true`.
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((previous: T) => T)) => void, boolean] {
  const [value, setValue] = useState<T>(defaultValue)
  const [isHydrated, setIsHydrated] = useState(false)

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      const stored = window.localStorage.getItem(key)
      if (stored !== null) {
        setValue(JSON.parse(stored) as T)
      }
    } catch {
      // Ignore malformed/inaccessible storage and fall back to defaultValue.
    }
    setIsHydrated(true)

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

  return [value, setStoredValue, isHydrated]
}
