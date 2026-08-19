import { diaryRegions } from '@/lib/fixtures'
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
  const allTiers = diaryRegions.flatMap((region) => region.tiers)
  const completedTasks = allTiers.reduce((sum, tier) => sum + tier.completedTasks, 0)
  const totalTasks = allTiers.reduce((sum, tier) => sum + tier.totalTasks, 0)
  const tiersComplete = allTiers.filter((tier) => tier.status === 'complete').length
  const eliteDiariesComplete = diaryRegions.filter(
    (region) => region.tiers.find((tier) => tier.tier === 'elite')?.status === 'complete'
  ).length

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
              label="Elite Diaries"
              stat={eliteDiariesComplete}
              secondaryStat={diaryRegions.length}
              caption="completed in full"
              captionClassName="text-muted-foreground"
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
          <Input placeholder="Search regions…" className="pl-8" />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="hide-completed-regions" />
          <Label htmlFor="hide-completed-regions">Hide completed regions</Label>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {diaryRegions.map((region) => (
          <DiaryRegionCard key={region.name} region={region} />
        ))}
      </div>
    </>
  )
}
