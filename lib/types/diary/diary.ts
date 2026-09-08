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
  locked: 'locked',
}

export type DiaryTierStatus = (typeof DiaryTierStatus)[keyof typeof DiaryTierStatus]

/** Progress within a single diary tier (Easy, Medium, Hard, Elite) for a region. */
export type DiaryTier = {
  tier: DiaryTierName
  status: DiaryTierStatus
  completedTasks: number
  totalTasks: number
}

/** An achievement diary region and its four difficulty tiers. */
export type DiaryRegion = {
  name: string
  tiers: DiaryTier[]
}
