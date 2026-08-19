'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

// `useLayoutEffect` warns when it runs during SSR (it has no effect there),
// so fall back to `useEffect` on the server and only use the layout variant
// in the browser, where it fires synchronously before paint.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

// The native `storage` event only fires in *other* tabs/windows, not the one
// that made the change — so two components in the same tab that both call
// `useLocalStorage` with the same key (e.g. a header form and a page reading
// its result) won't otherwise see each other's updates. Broadcasting this
// custom event on every write lets same-tab instances for the same key stay
// in sync too.
const LOCAL_STORAGE_CHANGE_EVENT = 'questly:local-storage-change'

interface LocalStorageChangeDetail {
  key: string
}

/**
 * Persists state to `localStorage`, keeping the in-memory value in sync
 * across renders, other components using the same key in the same tab, and
 * other tabs/windows.
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

  // Mirrors the latest `value` so `setStoredValue` can resolve functional
  // updates without needing to read the value inside a `setState` updater —
  // see the note there for why. Synced in a layout effect (refs must not be
  // written during render) and also updated directly whenever
  // `setStoredValue` computes a new value, so it never lags behind.
  const valueRef = useRef(value)

  useIsomorphicLayoutEffect(() => {
    valueRef.current = value
  }, [value])

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const readStored = () => {
      try {
        const stored = window.localStorage.getItem(key)
        if (stored !== null) {
          setValue(JSON.parse(stored) as T)
        }
      } catch {
        // Ignore malformed/inaccessible storage and fall back to defaultValue.
      }
    }

    readStored()
    setIsHydrated(true)

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) return

      try {
        setValue(event.newValue !== null ? (JSON.parse(event.newValue) as T) : defaultValue)
      } catch {
        // Ignore malformed storage updates.
      }
    }

    const handleLocalChange = (event: Event) => {
      const detail = (event as CustomEvent<LocalStorageChangeDetail>).detail
      if (detail?.key !== key) return
      readStored()
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener(LOCAL_STORAGE_CHANGE_EVENT, handleLocalChange)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(LOCAL_STORAGE_CHANGE_EVENT, handleLocalChange)
    }
  }, [key])

  const setStoredValue = useCallback(
    (next: T | ((previous: T) => T)) => {
      const resolved = next instanceof Function ? next(valueRef.current) : next
      setValue(resolved)
      valueRef.current = resolved

      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved))
          // Dispatched outside the `setState` updater above (rather than
          // inside it) since `setState` updaters run during React's render
          // phase and must stay pure. Dispatching a synchronous event that
          // triggers another component's `setState` from within one would
          // trip React's "Cannot update a component while rendering a
          // different component" warning.
          window.dispatchEvent(
            new CustomEvent<LocalStorageChangeDetail>(LOCAL_STORAGE_CHANGE_EVENT, {
              detail: { key },
            })
          )
        } catch {
          // Ignore write failures (e.g. storage disabled/full).
        }
      }
    },
    [key]
  )

  return [value, setStoredValue, isHydrated]
}
