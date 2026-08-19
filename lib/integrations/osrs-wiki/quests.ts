'use client'

import { useCallback, useEffect, useState } from 'react'

import type {
  FetchWikiOptions,
  UseQuestListResult,
  WikiQuestListItem,
} from '@/lib/types/osrs-wiki/osrs-wiki'
import { WikiError } from '@/lib/types/osrs-wiki/osrs-wiki'

import { DEFAULT_BASE_URL, wikiFetch } from './client'

interface RawQuestListResponse {
  query?: {
    embeddedin?: { pageid: number; title: string }[]
  }
  continue?: {
    eicontinue?: string
  }
}

/**
 * Fetches the full OSRS quest list by walking every page that embeds
 * `Template:Infobox Quest` (the wiki's canonical way of identifying quest
 * pages). Follows pagination automatically since the wiki caps each
 * response at 500 results.
 */
export async function fetchQuestList(options: FetchWikiOptions = {}): Promise<WikiQuestListItem[]> {
  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL
  const quests: WikiQuestListItem[] = []
  let eicontinue: string | undefined

  do {
    const url = `${baseUrl}?mode=quests${
      eicontinue ? `&eicontinue=${encodeURIComponent(eicontinue)}` : ''
    }`

    const json = await wikiFetch<RawQuestListResponse>(
      url,
      options.signal,
      'fetching the OSRS quest list'
    )

    for (const page of json.query?.embeddedin ?? []) {
      quests.push({ pageId: page.pageid, title: page.title })
    }

    eicontinue = json.continue?.eicontinue
  } while (eicontinue)

  return quests
}

/**
 * Fetches the OSRS quest list once on mount (and whenever `refetch` is
 * called). Unlike `useWikiSearch`/`useWikiPage`, there's no query param to
 * gate on — the quest list is always fetched.
 */
export function useQuestList(options: FetchWikiOptions = {}): UseQuestListResult {
  const [data, setData] = useState<WikiQuestListItem[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<WikiError | null>(null)
  const [refetchTick, setRefetchTick] = useState(0)

  const refetch = useCallback(() => setRefetchTick((t) => t + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    // Marking the start of a (re)fetch is intentionally synchronous here —
    // there's no async work to defer it into.
    /* eslint-disable react-hooks/set-state-in-effect */
    setLoading(true)
    setError(null)
    /* eslint-enable react-hooks/set-state-in-effect */

    fetchQuestList({ ...options, signal: controller.signal })
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
