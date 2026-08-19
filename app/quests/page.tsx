'use client'

import { useMemo, useState } from 'react'

import { questDetails } from '@/lib/data'
import { useQuestProgress } from '@/lib/hooks/use-quest-progress'
import { buildQuestLog } from '@/lib/quest-log'
import type { QuestStatus } from '@/lib/types/quest'
import { Search } from 'lucide-react'

import { FilterPillGroup } from '@/components/ui/filter-pill-group/filter-pill-group'
import { PageHero } from '@/components/ui/page-hero/page-hero'
import { QuestTierGroup } from '@/components/ui/quest-tier-group/quest-tier-group'
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

const FILTERS = ['All', 'Not started', 'In progress', 'Completed'] as const
type QuestFilter = (typeof FILTERS)[number]

const FILTER_STATUS: Record<QuestFilter, QuestStatus | null> = {
  All: null,
  'Not started': 'not-started',
  'In progress': 'in-progress',
  Completed: 'completed',
}

export default function QuestsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<QuestFilter>('All')
  const [membersOnly, setMembersOnly] = useState(false)
  const { statusByQuest, setQuestStatus } = useQuestProgress()

  const questLog = useMemo(
    () => buildQuestLog(questDetails, statusByQuest),
    [statusByQuest]
  )

  const totalQuests = questLog.reduce((sum, tier) => sum + tier.quests.length, 0)
  const completedQuests = questLog.reduce(
    (sum, tier) => sum + tier.quests.filter((quest) => quest.status === 'completed').length,
    0
  )
  const inProgress = questLog
    .flatMap((tier) => tier.quests)
    .find((quest) => quest.status === 'in-progress')
  const earnedQp = questLog.reduce(
    (sum, tier) =>
      sum +
      tier.quests.filter((q) => q.status === 'completed').reduce((s, q) => s + q.questPoints, 0),
    0
  )
  const totalQp = questLog.reduce(
    (sum, tier) => sum + tier.quests.reduce((s, q) => s + q.questPoints, 0),
    0
  )

  const filteredQuestLog = useMemo(() => {
    const query = search.trim().toLowerCase()
    const requiredStatus = FILTER_STATUS[statusFilter]

    return questLog.map((tier) => ({
      tier,
      quests: tier.quests.filter((quest) => {
        if (query && !quest.name.toLowerCase().includes(query)) return false
        if (requiredStatus && quest.status !== requiredStatus) return false
        if (membersOnly && !quest.members) return false
        return true
      }),
    }))
  }, [questLog, search, statusFilter, membersOnly])

  const hasResults = filteredQuestLog.some(({ quests }) => quests.length > 0)

  return (
    <>
      <PageHero
        eyebrow="Quest Log"
        titleLines={[
          `${totalQuests} quests.`,
          `You've earned the right to be smug about ${completedQuests}.`,
        ]}
        description="Every quest in Gielinor, sorted by what's left to prove. Filter by status or difficulty, or just let the Sage tell you what to do next."
        actions={<ViewToggle items={VIEW_TOGGLE_ITEMS} />}
        stats={
          <StatCardGroup className="sm:[&>*]:flex-1">
            <StatCard label="Quest Points" stat={earnedQp} secondaryStat={totalQp} />
            <StatCard label="Quests Completed" stat={completedQuests} secondaryStat={totalQuests} />
            <StatCard label="In Progress" stat={inProgress ? 1 : 0} caption={inProgress?.name} />
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
            placeholder="Search quests…"
            className="pl-8"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <FilterPillGroup
            items={FILTERS}
            activeItem={statusFilter}
            onSelect={(item) => setStatusFilter(item as QuestFilter)}
          />
          <div className="flex items-center gap-2">
            <Checkbox
              id="members-quests"
              checked={membersOnly}
              onCheckedChange={(checked) => setMembersOnly(checked)}
            />
            <Label htmlFor="members-quests">Members quests</Label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {hasResults ? (
          filteredQuestLog.map(
            ({ tier, quests }) =>
              quests.length > 0 && (
                <QuestTierGroup
                  key={tier.difficulty}
                  tier={tier}
                  quests={quests}
                  onStatusChange={setQuestStatus}
                />
              )
          )
        ) : (
          <p className="text-center text-muted-foreground">
            No quests match your filters. Try broadening your search.
          </p>
        )}
      </div>
    </>
  )
}
