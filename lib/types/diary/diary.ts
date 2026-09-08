export const DiaryTierName = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
  elite: 'elite',
}

export type DiaryTierName = (typeof DiaryTierName)[keyof typeof DiaryTierName]

export const DiaryTierStatus = {
  complete: 'complete',
  inProgress: 'in-progress',
  notStarted: 'not-started',
}

export type DiaryTierStatus = (typeof DiaryTierStatus)[keyof typeof DiaryTierStatus]

/** Tier order used to resolve a `DiaryTier`'s lock state — see `buildDiaryLog`. */
export const DIARY_TIER_ORDER: DiaryTierName[] = [
  DiaryTierName.easy,
  DiaryTierName.medium,
  DiaryTierName.hard,
  DiaryTierName.elite,
]

/** A single task within one difficulty tier of a diary region, with locally-tracked completion. */
export type DiaryTask = {
  description: string
  /** Plain-text requirements for this specific task (skills, quest completion, items), if any. */
  requirements: string[]
  completed: boolean
}

/** Progress within a single diary tier (Easy, Medium, Hard, Elite) for a region. */
export type DiaryTier = {
  tier: DiaryTierName
  status: DiaryTierStatus
  completedTasks: number
  totalTasks: number
  /** Individual tasks within this tier, if available (omitted by hand-authored fixtures/samples). */
  tasks?: DiaryTask[]
}

/** An achievement diary region and its four difficulty tiers. */
export type DiaryRegion = {
  name: string
  tiers: DiaryTier[]
}
