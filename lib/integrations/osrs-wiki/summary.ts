'use client'

import { useCallback, useEffect, useState } from 'react'

import type { FetchWikiOptions, UseWikiPageResult, WikiPageSummary } from '@/lib/types/osrs-wiki'
import { WikiError } from '@/lib/types/osrs-wiki'

import { DEFAULT_BASE_URL, wikiFetch } from './client'

interface RawSummaryResponse {
  query?: {
    pages?: {
      pageid: number
      title: string
      extract?: string
      missing?: boolean
    }[]
  }
}

export async function fetchWikiPageSummary(
  title: string,
  options: FetchWikiOptions = {}
): Promise<WikiPageSummary> {
  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL
  const url = `${baseUrl}?mode=summary&title=${encodeURIComponent(title)}`

  const json = await wikiFetch<RawSummaryResponse>(
    url,
    options.signal,
    `fetching the OSRS Wiki page "${title}"`
  )

  const page = json.query?.pages?.[0]

  if (!page || page.missing) {
    throw new WikiError(`Wiki page "${title}" not found.`, 404)
  }

  return {
    pageId: page.pageid,
    title: page.title,
    extract: page.extract ?? '',
  }
}

export function useWikiPage(
  title: string | null,
  options: FetchWikiOptions = {}
): UseWikiPageResult {
  const [data, setData] = useState<WikiPageSummary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<WikiError | null>(null)
  const [refetchTick, setRefetchTick] = useState(0)

  const refetch = useCallback(() => setRefetchTick((t) => t + 1), [])

  useEffect(() => {
    if (!title) {
      // Resetting to the "no title" state is intentionally synchronous here —
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

    fetchWikiPageSummary(title, { ...options, signal: controller.signal })
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
  }, [title, options.baseUrl, refetchTick])

  return { data, loading, error, refetch }
}
