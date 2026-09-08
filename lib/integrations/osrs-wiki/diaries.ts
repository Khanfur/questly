'use client'

import { useCallback, useEffect, useState } from 'react'

import type { FetchWikiOptions, UseDiaryListResult, WikiDiaryListItem } from '@/lib/types/osrs-wiki'
import { WikiError } from '@/lib/types/osrs-wiki'

import { DEFAULT_BASE_URL, wikiFetch } from './client'

interface RawDiaryListResponse {
  query?: {
    embeddedin?: { pageid: number; title: string }[]
  }
  continue?: {
    eicontinue?: string
  }
}

/**
 * Fetches the full Achievement Diary region list by walking every page that
 * embeds `Template:Infobox Achievement Diary` (the wiki's canonical way of
 * identifying diary region pages). Follows pagination automatically since
 * the wiki caps each response at 500 results. That query also returns
 * "Steam Achievements" (a false-positive page that embeds the template
 * without being a real diary region), so results are filtered to titles
 * ending in " Diary" — mirrors `fetchQuestList`.
 */
export async function fetchDiaryList(options: FetchWikiOptions = {}): Promise<WikiDiaryListItem[]> {
  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL
  const diaries: WikiDiaryListItem[] = []
  let eicontinue: string | undefined

  do {
    const url = `${baseUrl}?mode=diaries${
      eicontinue ? `&eicontinue=${encodeURIComponent(eicontinue)}` : ''
    }`

    const json = await wikiFetch<RawDiaryListResponse>(
      url,
      options.signal,
      'fetching the OSRS Achievement Diary list'
    )

    for (const page of json.query?.embeddedin ?? []) {
      if (!/\bDiary$/.test(page.title)) continue
      diaries.push({ pageId: page.pageid, title: page.title })
    }

    eicontinue = json.continue?.eicontinue
  } while (eicontinue)

  return diaries
}

/**
 * Fetches the Achievement Diary region list once on mount (and whenever
 * `refetch` is called). Unlike `useWikiSearch`/`useWikiPage`, there's no
 * query param to gate on — the diary list is always fetched.
 */
export function useDiaryList(options: FetchWikiOptions = {}): UseDiaryListResult {
  const [data, setData] = useState<WikiDiaryListItem[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<WikiError | null>(null)
  const [refetchTick, setRefetchTick] = useState(0)

  const refetch = useCallback(() => setRefetchTick((t) => t + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    /* eslint-disable react-hooks/set-state-in-effect */
    setLoading(true)
    setError(null)
    /* eslint-enable react-hooks/set-state-in-effect */

    fetchDiaryList({ ...options, signal: controller.signal })
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
  }, [options.baseUrl, refetchTick])

  return { data, loading, error, refetch }
}
