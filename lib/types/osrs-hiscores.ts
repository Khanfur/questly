import type { ActivityEntry } from './activity'
import type { SkillEntry } from './hiscores'

export type { ActivityEntry } from './activity'
export type { SkillEntry } from './hiscores'

export interface OsrsHiscores {
  skills: SkillEntry[]
  activities: ActivityEntry[]
  /** Convenience lookup: skills.find(s => s.name === 'Overall') */
  overall: SkillEntry
}

export interface FetchHiscoresOptions {
  /**
   * Override the base endpoint. Use this to point at your own backend
   * proxy instead of hitting secure.runescape.com directly from the
   * browser (recommended, due to CORS — see file header).
   * Defaults to the official lite endpoint.
   */
  baseUrl?: string
  signal?: AbortSignal
}

export interface UseHiscoresResult {
  data: OsrsHiscores | null
  loading: boolean
  error: HiscoresError | null
  refetch: () => void
}

export class HiscoresError extends Error {
  message: string
  name: string

  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message)
    this.name = 'HiscoresError'
    this.message = message
    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, HiscoresError.prototype)
  }
}
