/**
 * Types for the OSRS Wiki (MediaWiki) API integration.
 * See `lib/integrations/osrsWiki.tsx` for usage.
 */
import type { QuestDifficulty } from '@/lib/types/quest'

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

/**
 * Quest metadata scraped from a page's `{{Infobox Quest}}`, `{{Quest details}}`,
 * and `{{Quest rewards}}` templates. Unlike `WikiQuestListItem` (from the
 * `embeddedin` list), this requires a per-page `action=parse` request, so it's
 * fetched on demand (e.g. quest detail view) rather than for the whole list.
 * Any field can be `null` if the page's wikitext doesn't include it.
 */
export interface WikiQuestDetails {
  pageId: number
  title: string
  difficulty: QuestDifficulty | null
  /** e.g. "Very Short", "Short", "Medium", "Long", "Very Long". */
  length: string | null
  members: boolean
  /** e.g. "Dragonkin, #3", or null if the quest isn't part of a series. */
  series: string | null
  questPoints: number | null
  /** Plain-text summary of how to start the quest, with wiki markup stripped. */
  start: string | null
  /** Plain-text description/synopsis of the quest, with wiki markup stripped. */
  description: string | null
  /** Direct prerequisites (skills, quest points, other quests), with wiki markup stripped and any transitive quest chains flattened out. */
  requirements: string[] | null
  /** Enemies the player must defeat during the quest (e.g. "Vorkath (level 392)"), if any. */
  enemies: string[] | null
  /** Items required to start/complete the quest (e.g. "A pickaxe"), if any. */
  itemsRequired: string[] | null
  /** Direct link to the quest's page on the OSRS Wiki. */
  wikiUrl: string
}

export interface UseQuestDetailsResult {
  data: WikiQuestDetails | null
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
