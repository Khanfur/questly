import type { QuestDifficulty, QuestTier } from '@/lib/types/quest'
import { cn } from '@/lib/utils'

import { QuestListItem } from '@/components/ui/quest-list-item/quest-list-item'
import { Progress } from '@/components/ui/shadcn/progress'

const DIFFICULTY_LABEL: Record<QuestDifficulty, string> = {
  novice: 'Novice',
  intermediate: 'Intermediate',
  experienced: 'Experienced',
  master: 'Master',
  grandmaster: 'Grandmaster',
}

interface QuestTierGroupProps {
  tier: QuestTier
  className?: string
}

/** A difficulty tier heading (with completion progress) and its list of quests. */
export function QuestTierGroup({ tier, className }: QuestTierGroupProps) {
  const completed = tier.quests.filter((quest) => quest.status === 'completed').length
  const total = tier.quests.length
  const percentComplete = total > 0 ? (completed / total) * 100 : 0

  return (
    <section className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-baseline gap-2">
          {DIFFICULTY_LABEL[tier.difficulty]}
          <span className="text-sm font-normal text-muted-foreground">
            {completed} / {total} complete
          </span>
        </h3>
        <Progress value={percentComplete} variant="secondary" className="w-24 sm:w-40" />
      </div>

      <div className="rounded-sm border border-border bg-card px-4">
        {tier.quests.map((quest) => (
          <QuestListItem key={quest.name} quest={quest} />
        ))}
      </div>
    </section>
  )
}
