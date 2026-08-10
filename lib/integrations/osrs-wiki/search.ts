'use client'

import { useCallback, useEffect, useState } from 'react'

import type { FetchWikiOptions, UseWikiSearchResult, WikiSearchResult } from '@/lib/types/osrs-wiki'
import { WikiError } from '@/lib/types/osrs-wiki'

import { DEFAULT_BASE_URL, wikiFetch } from './client'

interface RawSearchResponse {
  query?: {
    search?: { pageid: number; title: string; snippet: string }[]
  }
}

export async function searchWiki(
  query: string,
  options: FetchWikiOptions = {}
): Promise<WikiSearchResult[]> {
  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL
  const url = `${baseUrl}?mode=search&q=${encodeURIComponent(query)}`

  const json = await wikiFetch<RawSearchResponse>(
    url,
    options.signal,
    `searching the OSRS Wiki for "${query}"`
  )

  return (json.query?.search ?? []).map((r) => ({
    pageId: r.pageid,
    title: r.title,
    snippet: r.snippet,
  }))
}

export function useWikiSearch(
  query: string | null,
  options: FetchWikiOptions = {}
): UseWikiSearchResult {
  const [data, setData] = useState<WikiSearchResult[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<WikiError | null>(null)
  const [refetchTick, setRefetchTick] = useState(0)

  const refetch = useCallback(() => setRefetchTick((t) => t + 1), [])

  useEffect(() => {
    if (!query) {
      // Resetting to the "no query" state is intentionally synchronous here —
      // there's no async work to defer it into.
      /* eslint-disable react-hooks/set-state-in-effect */
      setData(null)
      setError(null)
      /* eslint-enable react-hooks/set-state-in-effect */
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    searchWiki(query, { ...options, signal: controller.signal })
      .then((result) => {
        setData(result)
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setError(err instanceof WikiError ? err : new WikiError((err as Error).message))
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, options.baseUrl, refetchTick])

  return { data, loading, error, refetch }
}
