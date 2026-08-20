'use client'

import { useEffect, useMemo, useState } from 'react'

import { miniquestDetails, questDetails } from '@/lib/data'
import { useAccountDetails } from '@/lib/hooks/use-account-details'
import { useQuestProgress } from '@/lib/hooks/use-quest-progress'
import { buildMiniquestLog, buildQuestLog } from '@/lib/quest-log'
import { Search } from 'lucide-react'

import { FilterPillGroup } from '@/components/ui/filter-pill-group/filter-pill-group'
import { MiniquestSection } from '@/components/ui/miniquest-section/miniquest-section'
import { PageHero } from '@/components/ui/page-hero/page-hero'
import { QuestTierGroup } from '@/components/ui/quest-tier-group/quest-tier-group'
import { SectionDivider } from '@/components/ui/section-divider/section-divider'
import { Checkbox } from '@/components/ui/shadcn/checkbox'
import { Input } from '@/components/ui/shadcn/input'
import { Label } from '@/components/ui/shadcn/label'
import { StatCard } from '@/components/ui/stat-card/stat-card'
import { StatCardGroup } from '@/components/ui/stat-card/stat-card-group'
import { ViewToggle } from '@/components/ui/view-toggle/view-toggle'
import {Miniquest, QuestStatus} from "@/lib/types/quest/quest";

const VIEW_TOGGLE_ITEMS = [
  { href: '/quests', label: 'Quest Log' },
  { href: '/quests/diaries', label: 'Achievement Diaries' },
] as const

const FILTERS = ['All', 'Not started', 'In progress', 'Completed'] as const
type QuestFilter = (typeof FILTERS)[number]

const FILTER_STATUS: Record<QuestFilter, QuestStatus | null> = {
  All: null,
  'Not started': QuestStatus.NotStarted,
  'In progress': QuestStatus.InProgress,
  Completed: QuestStatus.Completed,
}

export default function QuestsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<QuestFilter>('All')
  const [f2pOnly, setF2pOnly] = useState(false)
  const { statusByQuest, setQuestStatus } = useQuestProgress()
  const { accountDetails } = useAccountDetails()

  // Default the filter to the player's actual account: F2P accounts can only
  // play F2P quests, so pre-filter for them (still user-overridable below).
  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setF2pOnly(accountDetails.membership === 'f2p')
  }, [accountDetails.membership])

  const questLog = useMemo(() => buildQuestLog(questDetails, statusByQuest), [statusByQuest])
  const miniquestLog = useMemo(
    () => buildMiniquestLog(miniquestDetails, statusByQuest),
    [statusByQuest]
  )

  const totalQuests = questLog.reduce((sum, tier) => sum + tier.quests.length, 0)
  
  const completedQuests = questLog.reduce(
    (sum, tier) => sum + tier.quests.filter((quest) => quest.status === QuestStatus.Completed).length,
    0
  )
  const inProgress = questLog.map((tier) => tier.quests.filter((quest) => quest.status === QuestStatus.InProgress)).flat()
  
  const earnedQp = questLog.reduce(
    (sum, tier) =>
      sum +
      tier.quests.filter((q) => q.status === QuestStatus.Completed).reduce((s, q) => s + q.questPoints, 0),
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
        return !(f2pOnly && quest.members);
      }),
    }))
  }, [questLog, search, statusFilter, f2pOnly])

  const filteredMiniquests = useMemo(() => {
    const query = search.trim().toLowerCase()
    const requiredStatus = FILTER_STATUS[statusFilter]

    return miniquestLog.filter((miniquest: Miniquest) : boolean => {
      if (query && !miniquest.name.toLowerCase().includes(query)) return false
      if (requiredStatus && miniquest.status !== requiredStatus) return false
      return !(f2pOnly && miniquest.members);
    })
  }, [miniquestLog, search, statusFilter, f2pOnly])

  const hasQuestResults = filteredQuestLog.some(({ quests }) => quests.length > 0)
  const hasResults = hasQuestResults || filteredMiniquests.length > 0

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
            <StatCard label="In Progress" stat={inProgress.length} />
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
              id="f2p-quests"
              checked={f2pOnly}
              onCheckedChange={(checked) => setF2pOnly(checked)}
            />
            <Label htmlFor="f2p-quests">Free-to-play only</Label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {hasResults ? (
          <>
            {filteredQuestLog.map(
              ({ tier, quests }) =>
                quests.length > 0 && (
                  <QuestTierGroup
                    key={tier.difficulty}
                    tier={tier}
                    quests={quests}
                    onStatusChange={setQuestStatus}
                  />
                )
            )}
            {filteredMiniquests.length > 0 && (
              <MiniquestSection
                miniquests={miniquestLog}
                filteredMiniquests={filteredMiniquests}
                onStatusChange={setQuestStatus}
              />
            )}
          </>
        ) : (
          <p className="text-center text-muted-foreground">
            No quests match your filters. Try broadening your search.
          </p>
        )}
      </div>
    </>
  )
}
