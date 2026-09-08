'use client'

import { useMemo, useState } from 'react'

import { diaryDetails } from '@/lib/data'
import { buildDiaryLog, diaryTaskKey } from '@/lib/diary-log/diary-log'
import { useDiaryProgress } from '@/lib/hooks/use-diary-progress'
import { DiaryTierStatus } from '@/lib/types/diary'
import { Search } from 'lucide-react'

import { DiaryRegionCard } from '@/components/ui/diary-region-card/diary-region-card'
import { PageHero } from '@/components/ui/page-hero/page-hero'
import { SectionDivider } from '@/components/ui/section-divider/section-divider'
import { Checkbox } from '@/components/ui/shadcn/checkbox'
import { Input } from '@/components/ui/shadcn/input'
import { Label } from '@/components/ui/shadcn/label'
import { StatCard } from '@/components/ui/stat-card/stat-card'
import { StatCardGroup } from '@/components/ui/stat-card/stat-card-group'
import { ViewToggle } from '@/components/ui/view-toggle/view-toggle'

const VIEW_TOGGLE_ITEMS = [
  { href: '/quests', label: 'Quest Log' },
  { href: '/quests/diaries', label: 'Achievement Diaries' },
] as const

export default function AchievementDiariesPage() {
  const [search, setSearch] = useState('')
  const [hideCompleted, setHideCompleted] = useState(false)
  const { completedByTask, toggleDiaryTask } = useDiaryProgress()

  const diaryRegions = useMemo(
    () => buildDiaryLog(diaryDetails, completedByTask),
    [completedByTask]
  )

  const allTiers = diaryRegions.flatMap((region) => region.tiers)
  const completedTasks = allTiers.reduce((sum, tier) => sum + tier.completedTasks, 0)
  const totalTasks = allTiers.reduce((sum, tier) => sum + tier.totalTasks, 0)
  const tiersComplete = allTiers.filter((tier) => tier.status === DiaryTierStatus.complete).length
  const regionsComplete = diaryRegions.filter((region) =>
    region.tiers.every((tier) => tier.status === DiaryTierStatus.complete)
  ).length

  const filteredRegions = useMemo(() => {
    const query = search.trim().toLowerCase()

    return diaryRegions.filter((region) => {
      if (query && !region.name.toLowerCase().includes(query)) return false
      return !(
        hideCompleted && region.tiers.every((tier) => tier.status === DiaryTierStatus.complete)
      )
    })
  }, [diaryRegions, search, hideCompleted])

  return (
    <>
      <PageHero
        eyebrow="Achievement Diaries"
        titleLines={[`${diaryRegions.length} regions.`, 'Somehow Wilderness is still Easy tier.']}
        description="Track every diary tier across Gielinor. Finish a tier's tasks to unlock its rewards — and the next tier up."
        actions={<ViewToggle items={VIEW_TOGGLE_ITEMS} />}
        stats={
          <StatCardGroup className="sm:[&>*]:flex-1">
            <StatCard label="Diary Tasks Done" stat={completedTasks} secondaryStat={totalTasks} />
            <StatCard label="Tiers Complete" stat={tiersComplete} secondaryStat={allTiers.length} />
            <StatCard
              label="Regions Completed"
              stat={regionsComplete}
              secondaryStat={diaryRegions.length}
            />
          </StatCardGroup>
        }
        className="mb-8"
      />

      <SectionDivider className="mb-8" />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            placeholder="Search regions…"
            className="pl-8"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="hide-completed-regions"
            checked={hideCompleted}
            onCheckedChange={(checked) => setHideCompleted(checked)}
          />
          <Label htmlFor="hide-completed-regions">Hide completed regions</Label>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filteredRegions.length > 0 ? (
          filteredRegions.map((region) => (
            <DiaryRegionCard
              key={region.name}
              region={region}
              onToggleTask={(tier, taskIndex) =>
                toggleDiaryTask(diaryTaskKey(region.name, tier, taskIndex))
              }
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No regions match your filters. Try broadening your search.
          </p>
        )}
      </div>
    </>
  )
}
