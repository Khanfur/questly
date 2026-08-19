export type DiaryTierName = 'easy' | 'medium' | 'hard' | 'elite'

export type DiaryTierStatus = 'complete' | 'in-progress' | 'not-started' | 'locked'

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
