'use client'

import { useCallback, useEffect, useState } from 'react'

import type {
  FetchHiscoresOptions,
  HiscoresError,
  OsrsHiscores,
  UseHiscoresResult,
} from '@/lib/types/osrs-hiscores'
import { HiscoresError as HiscoresErrorClass } from '@/lib/types/osrs-hiscores'

import { fetchHiscores } from './client'

export function useHiscores(
  playerName: string | null,
  options: FetchHiscoresOptions = {}
): UseHiscoresResult {
  const [data, setData] = useState<OsrsHiscores | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<HiscoresError | null>(null)
  const [refetchTick, setRefetchTick] = useState(0)

  const refetch = useCallback(() => setRefetchTick((t) => t + 1), [])

  useEffect(() => {
    if (!playerName) {
      // Resetting to the "no player selected" state is intentionally synchronous
      // here — there's no async work to defer it into.
      /* eslint-disable react-hooks/set-state-in-effect */
      setData(null)
      setError(null)
      /* eslint-enable react-hooks/set-state-in-effect */
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetchHiscores(playerName, { ...options, signal: controller.signal })
      .then((result) => {
        setData(result)
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setError(
          err instanceof HiscoresErrorClass
            ? (err as HiscoresError)
            : new HiscoresErrorClass((err as Error).message)
        )
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerName, options.baseUrl, refetchTick])

  return { data, loading, error, refetch }
}
