'use client'

/**
 * Shared client for the OSRS Wiki (MediaWiki) API integration.
 * ------------------------------------------------------------------
 * The wiki runs on MediaWiki, exposing its API at:
 *   https://oldschool.runescape.wiki/api.php
 *
 * IMPORTANT — CORS & User-Agent:
 * The wiki's API etiquette (https://oldschool.runescape.wiki/w/Help:API)
 * asks clients to identify themselves via a descriptive User-Agent header,
 * which browsers won't let us set on cross-origin requests. To keep this
 * working reliably (and avoid CORS issues), requests are routed through
 * our own `/api/osrs-wiki` proxy route by default. Every fetch function in
 * this module accepts a `baseUrl` override if you need to point elsewhere
 * (e.g. directly at the wiki API during testing).
 */

import { WikiError } from '@/lib/types/osrs-wiki'

export const DEFAULT_BASE_URL = '/api/osrs-wiki'

export async function wikiFetch<T>(
  url: string,
  signal: AbortSignal | undefined,
  context: string
): Promise<T> {
  let res: Response
  try {
    res = await fetch(url, { signal })
  } catch (err) {
    throw new WikiError(`Network error while ${context}: ${(err as Error).message}`)
  }

  if (!res.ok) {
    throw new WikiError(`OSRS Wiki request failed with status ${res.status}.`, res.status)
  }

  return (await res.json()) as T
}
