import {
  DIARY_TIER_ORDER,
  DiaryRegion,
  DiaryTask,
  DiaryTier,
  DiaryTierStatus,
} from '@/lib/types/diary'
import type { WikiDiaryDetails } from '@/lib/types/osrs-wiki'

/**
 * Builds a stable, unique key for a single diary task's locally-tracked
 * completion state (there's no OSRS API that exposes per-task diary
 * completion — see `useDiaryProgress`). Keyed by region + tier + the task's
 * index within that tier, since task descriptions aren't guaranteed unique.
 */
export function diaryTaskKey(regionName: string, tier: DiaryTier['tier'], index: number): string {
  return `${regionName}::${tier}::${index}`
}

/**
 * Builds the full Achievement Diary tracker (every region, each with its four
 * difficulty tiers and their tasks) from the generated `diaryDetails` data
 * (`lib/data/diary/diary-details.ts`), applying each task's locally-tracked
 * completion status.
 *
 * A tier's `status` is derived purely from its own task completion —
 * `complete` once every task is done, `in-progress` once at least one is,
 * otherwise `not-started`. Diary tiers can be completed in any order in-game,
 * so there's no "locked" status gating a tier on its predecessor.
 */
export function buildDiaryLog(
  diaryDetails: WikiDiaryDetails[],
  completedByTask: Record<string, boolean>
): DiaryRegion[] {
  return diaryDetails
    .map((details) => toDiaryRegion(details, completedByTask))
    .sort((a, b) => a.name.localeCompare(b.name))
}

function toDiaryRegion(
  details: WikiDiaryDetails,
  completedByTask: Record<string, boolean>
): DiaryRegion {
  const tiers: DiaryTier[] = []

  for (const tierName of DIARY_TIER_ORDER) {
    const tierDetails = details.tiers.find((t) => t.tier === tierName)
    const tasks: DiaryTask[] = (tierDetails?.tasks ?? []).map((task, index) => ({
      description: task.description,
      requirements: task.requirements,
      completed: completedByTask[diaryTaskKey(details.name, tierName, index)] ?? false,
    }))

    const completedTasks = tasks.filter((task) => task.completed).length
    const totalTasks = tasks.length
    const status = resolveTierStatus(completedTasks, totalTasks)

    tiers.push({ tier: tierName, status, completedTasks, totalTasks, tasks })
  }

  return { name: details.name, tiers }
}

function resolveTierStatus(completedTasks: number, totalTasks: number): DiaryTierStatus {
  if (totalTasks > 0 && completedTasks === totalTasks) return DiaryTierStatus.complete
  if (completedTasks > 0) return DiaryTierStatus.inProgress
  return DiaryTierStatus.notStarted
}
