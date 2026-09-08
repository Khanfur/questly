'use client'

import { useCallback, useEffect, useState } from 'react'

import type {
  FetchWikiOptions,
  UseMiniquestListResult,
  WikiMiniquestListItem,
} from '@/lib/types/osrs-wiki'
import { WikiError } from '@/lib/types/osrs-wiki'

import { DEFAULT_BASE_URL, wikiFetch } from './client'

interface RawMiniquestListResponse {
  query?: {
    embeddedin?: { pageid: number; title: string }[]
  }
  continue?: {
    eicontinue?: string
  }
}

/**
 * Fetches the full OSRS miniquest list by walking every page that embeds
 * `Template:Infobox Miniquest` (the wiki's canonical way of identifying
 * miniquest pages — see https://oldschool.runescape.wiki/w/Miniquests).
 * Follows pagination automatically since the wiki caps each response at 500
 * results, though there are only ~20 miniquests at time of writing.
 */
export async function fetchMiniquestList(
  options: FetchWikiOptions = {}
): Promise<WikiMiniquestListItem[]> {
  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL
  const miniquests: WikiMiniquestListItem[] = []
  let eicontinue: string | undefined

  do {
    const url = `${baseUrl}?mode=miniquests${
      eicontinue ? `&eicontinue=${encodeURIComponent(eicontinue)}` : ''
    }`

    const json = await wikiFetch<RawMiniquestListResponse>(
      url,
      options.signal,
      'fetching the OSRS miniquest list'
    )

    for (const page of json.query?.embeddedin ?? []) {
      miniquests.push({ pageId: page.pageid, title: page.title })
    }

    eicontinue = json.continue?.eicontinue
  } while (eicontinue)

  return miniquests
}

/**
 * Fetches the OSRS miniquest list once on mount (and whenever `refetch` is
 * called). Mirrors `useQuestList` — see that file for details.
 */
export function useMiniquestList(options: FetchWikiOptions = {}): UseMiniquestListResult {
  const [data, setData] = useState<WikiMiniquestListItem[] | null>(null)
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

    fetchMiniquestList({ ...options, signal: controller.signal })
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
