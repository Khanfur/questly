import type { Miniquest, QuestStatus } from '@/lib/types/quest'
import { cn } from '@/lib/utils'

import { MiniquestListItem } from '@/components/ui/miniquest-list-item/miniquest-list-item'
import { Progress } from '@/components/ui/shadcn/progress'

interface MiniquestSectionProps {
  /** The full, unfiltered list of miniquests — used to compute overall completion progress. */
  miniquests: Miniquest[]
  /**
   * Miniquests to render in the list, e.g. after applying search/status/members
   * filters. Defaults to `miniquests`. Completion progress always reflects the
   * full, unfiltered `miniquests` list so it keeps representing overall progress.
   */
  filteredMiniquests?: Miniquest[]
  className?: string
  /** Called with a miniquest's name and next status when that miniquest's status icon is clicked. */
  onStatusChange?: (miniquestName: string, status: QuestStatus) => void
}

/**
 * The "Miniquests" section of the Quest Log — a heading with completion
 * progress and a flat list of miniquests. Unlike `QuestTierGroup`, this isn't
 * grouped by difficulty tier: miniquests are a small, separate category (see
 * https://oldschool.runescape.wiki/w/Miniquests) that isn't counted towards
 * the Quest Log's total quest / quest point counts.
 */
export function MiniquestSection({
  miniquests,
  filteredMiniquests = miniquests,
  className,
  onStatusChange,
}: MiniquestSectionProps) {
  const completed = miniquests.filter((miniquest) => miniquest.status === 'completed').length
  const total = miniquests.length
  const percentComplete = total > 0 ? (completed / total) * 100 : 0

  return (
    <section className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-baseline gap-2">
          Miniquests
          <span className="text-sm font-normal text-muted-foreground">
            {completed} / {total} complete
          </span>
        </h3>
        <Progress value={percentComplete} variant="secondary" className="w-24 sm:w-40" />
      </div>

      {filteredMiniquests.length > 0 && (
        <div className="rounded-sm border border-border bg-card px-4">
          {filteredMiniquests.map((miniquest) => (
            <MiniquestListItem
              key={miniquest.name}
              miniquest={miniquest}
              onStatusChange={
                onStatusChange ? (status) => onStatusChange(miniquest.name, status) : undefined
              }
            />
          ))}
        </div>
      )}
    </section>
  )
}
