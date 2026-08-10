/**
 * OSRS Wiki (MediaWiki) API integration
 * ------------------------------------------------------------------
 * Split by concern:
 *   client.ts   - shared fetch helper + default proxy base URL
 *   search.ts   - `searchWiki` / `useWikiSearch`
 *   summary.ts  - `fetchWikiPageSummary` / `useWikiPage`
 *   quests.ts   - `fetchQuestList` / `useQuestList`
 *
 * See each file for details. This barrel re-exports the public API so
 * consumers can keep importing from `@/lib/integrations/osrs-wiki`.
 */

export { searchWiki, useWikiSearch } from './search'
export { fetchWikiPageSummary, useWikiPage } from './summary'
export { fetchQuestList, useQuestList } from './quests'

export type {
  WikiSearchResult,
  WikiPageSummary,
  WikiQuestListItem,
  FetchWikiOptions,
  UseWikiSearchResult,
  UseWikiPageResult,
  UseQuestListResult,
} from '@/lib/types/osrs-wiki'
export { WikiError } from '@/lib/types/osrs-wiki'
