/**
 * OSRS Wiki (MediaWiki) API integration
 * ------------------------------------------------------------------
 * Split by concern:
 *   client.ts   - shared fetch helper + default proxy base URL
 *   search.ts   - `searchWiki` / `useWikiSearch`
 *   summary.ts  - `fetchWikiPageSummary` / `useWikiPage`
 *   quests.ts   - `fetchQuestList` / `useQuestList`
 *   quest-details.ts - `fetchQuestDetails` / `useQuestDetails`
 *   miniquests.ts - `fetchMiniquestList` / `useMiniquestList`
 *   miniquest-details.ts - `fetchMiniquestDetails` / `useMiniquestDetails`
 *   diaries.ts - `fetchDiaryList` / `useDiaryList`
 *   diary-details.ts - `fetchDiaryDetails` / `useDiaryDetails`
 *
 * See each file for details. This barrel re-exports the public API so
 * consumers can keep importing from `@/lib/integrations/osrs-wiki`.
 */

export { searchWiki, useWikiSearch } from './search'
export { fetchWikiPageSummary, useWikiPage } from './summary'
export { fetchQuestList, useQuestList } from './quests'
export { fetchQuestDetails, useQuestDetails } from './quest-details'
export { fetchMiniquestList, useMiniquestList } from './miniquests'
export { fetchMiniquestDetails, useMiniquestDetails } from './miniquest-details'
export { fetchDiaryList, useDiaryList } from './diaries'
export { fetchDiaryDetails, useDiaryDetails } from './diary-details'

export type {
  WikiSearchResult,
  WikiPageSummary,
  WikiQuestListItem,
  WikiQuestDetails,
  WikiMiniquestListItem,
  WikiMiniquestDetails,
  WikiDiaryListItem,
  WikiDiaryDetails,
  FetchWikiOptions,
  UseWikiSearchResult,
  UseWikiPageResult,
  UseQuestListResult,
  UseQuestDetailsResult,
  UseMiniquestListResult,
  UseMiniquestDetailsResult,
  UseDiaryListResult,
  UseDiaryDetailsResult,
} from '@/lib/types/osrs-wiki'
export { WikiError } from '@/lib/types/osrs-wiki'
