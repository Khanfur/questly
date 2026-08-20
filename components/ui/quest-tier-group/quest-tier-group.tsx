import type { QuestDifficulty, QuestStatus, QuestTier } from '@/lib/types/quest/quest'
import { cn } from '@/lib/utils'

import { QuestListItem } from '@/components/ui/quest-list-item/quest-list-item'
import { Progress } from '@/components/ui/shadcn/progress'

interface QuestTierGroupProps {
  tier: QuestTier
  /**
   * Quests to render in the list, e.g. after applying search/status/members filters.
   * Defaults to `tier.quests`. Completion progress always reflects the full, unfiltered
   * `tier.quests` so it keeps representing overall tier progress.
   */
  quests?: QuestTier['quests']
  className?: string
  /** Called with a quest's name and next status when that quest's status icon is clicked. */
  onStatusChange?: (questName: string, status: QuestStatus) => void
}

/** A difficulty tier heading (with completion progress) and its list of quests. */
export function QuestTierGroup({
  tier,
  quests = tier.quests,
  className,
  onStatusChange,
}: QuestTierGroupProps) {
  const completed = tier.quests.filter((quest) => quest.status === 'completed').length
  const total = tier.quests.length
  const percentComplete = total > 0 ? (completed / total) * 100 : 0

  return (
    <section className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-baseline gap-2">
          {tier.difficulty}
          <span className="text-sm font-normal text-muted-foreground">
            {completed} / {total} complete
          </span>
        </h3>
        <Progress value={percentComplete} variant="secondary" className="w-24 sm:w-40" />
      </div>

      {quests.length > 0 && (
        <div className="rounded-sm border border-border bg-card px-4">
          {quests.map((quest) => (
            <QuestListItem
              key={quest.name}
              quest={quest}
              onStatusChange={
                onStatusChange ? (status) => onStatusChange(quest.name, status) : undefined
              }
            />
          ))}
        </div>
      )}
    </section>
  )
}
