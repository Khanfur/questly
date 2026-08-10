/**
 * OSRS Hiscores (Lite) API integration
 * ------------------------------------------------------------------
 * Split by concern:
 *   client.ts - `parseHiscoresCsv` / `fetchHiscores`
 *   hook.ts   - `useHiscores`
 *
 * See each file for details. This barrel re-exports the public API so
 * consumers can keep importing from `@/lib/integrations/osrs-hiscores`.
 */

export { parseHiscoresCsv, fetchHiscores } from './client'
export { useHiscores } from './hook'

export type {
  OsrsHiscores,
  SkillEntry,
  ActivityEntry,
  FetchHiscoresOptions,
  UseHiscoresResult,
} from '@/lib/types/osrs-hiscores'
export { HiscoresError } from '@/lib/types/osrs-hiscores'
