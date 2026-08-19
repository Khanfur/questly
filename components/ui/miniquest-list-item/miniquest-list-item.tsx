'use client'

import { useState } from 'react'

import type { Miniquest, QuestStatus } from '@/lib/types/quest'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

import { QuestDifficultyBadge } from '@/components/ui/quest-difficulty-badge/quest-difficulty-badge'
import { QuestStatusIcon } from '@/components/ui/quest-list-item/quest-status-icon'
import { Progress } from '@/components/ui/shadcn/progress'

import { MiniquestDetailModal } from '../miniquest-detail-modal/miniquest-detail-modal'

const STATUS_LABEL: Record<QuestStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  'not-started': 'Not started',
}

const STATUS_LABEL_CLASSNAME: Record<QuestStatus, string> = {
  completed: 'text-secondary',
  'in-progress': 'text-primary',
  'not-started': 'text-muted-foreground',
}

// Clicking the status icon cycles a miniquest through its lifecycle.
const NEXT_STATUS: Record<QuestStatus, QuestStatus> = {
  'not-started': 'in-progress',
  'in-progress': 'completed',
  completed: 'not-started',
}

interface MiniquestListItemProps {
  miniquest: Miniquest
  className?: string
  /** Called with the next status when the status icon is clicked, to cycle it. */
  onStatusChange?: (status: QuestStatus) => void
}

/**
 * A single row in the Miniquests list — mirrors `QuestListItem`, but omits
 * the quest points badge since miniquests award none.
 */
export function MiniquestListItem({
  miniquest,
  className,
  onStatusChange,
}: MiniquestListItemProps) {
  const { name, difficulty, status } = miniquest
  const [detailsOpen, setDetailsOpen] = useState(false)

  return (
    <div
      className={cn(
        'flex flex-col gap-2 border-b border-border/60 py-3 last:border-b-0',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <QuestStatusIcon
            status={status}
            className="mt-0.5 shrink-0"
            onClick={onStatusChange ? () => onStatusChange(NEXT_STATUS[status]) : undefined}
            label={
              onStatusChange ? `Mark "${name}" as ${STATUS_LABEL[NEXT_STATUS[status]]}` : undefined
            }
          />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate font-heading font-bold text-foreground">{name}</span>
              <QuestDifficultyBadge difficulty={difficulty} />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <span
            className={cn(
              'label hidden whitespace-nowrap sm:inline',
              STATUS_LABEL_CLASSNAME[status]
            )}
          >
            {STATUS_LABEL[status]}
          </span>
          <button
            type="button"
            onClick={() => setDetailsOpen(true)}
            aria-label={`View "${name}" miniquest details`}
            className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {status === 'in-progress' && (
        <Progress value={45} variant="default" className="ml-8" aria-label={`${name} progress`} />
      )}

      <MiniquestDetailModal
        miniquest={miniquest}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  )
}
