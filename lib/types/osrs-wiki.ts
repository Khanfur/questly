/**
 * Types for the OSRS Wiki (MediaWiki) API integration.
 * See `lib/integrations/osrsWiki.tsx` for usage.
 */

export interface WikiSearchResult {
  pageId: number
  title: string
  /** HTML snippet with `<span class="searchmatch">` highlights, as returned by the API. */
  snippet: string
}

export interface WikiPageSummary {
  pageId: number
  title: string
  /** Plain-text intro extract of the page (no wikitext markup). */
  extract: string
}

export interface WikiQuestListItem {
  pageId: number
  title: string
}

export interface FetchWikiOptions {
  /**
   * Override the base endpoint. Use this to point at your own backend
   * proxy instead of hitting oldschool.runescape.wiki directly from the
   * browser (recommended — see file header in osrsWiki.tsx).
   * Defaults to the app's own `/api/osrs-wiki` proxy route.
   */
  baseUrl?: string
  signal?: AbortSignal
}

export interface UseWikiSearchResult {
  data: WikiSearchResult[] | null
  loading: boolean
  error: WikiError | null
  refetch: () => void
}

export interface UseWikiPageResult {
  data: WikiPageSummary | null
  loading: boolean
  error: WikiError | null
  refetch: () => void
}

export interface UseQuestListResult {
  data: WikiQuestListItem[] | null
  loading: boolean
  error: WikiError | null
  refetch: () => void
}

export class WikiError extends Error {
  message: string
  name: string

  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message)
    this.name = 'WikiError'
    this.message = message
    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, WikiError.prototype)
  }
}
