'use client'

import { useState } from 'react'

import type { Quest, QuestStatus } from '@/lib/types/quest/quest'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

import { QuestDetailModal } from '@/components/ui/quest-detail-modal/quest-detail-modal'
import { QuestDifficultyBadge } from '@/components/ui/quest-difficulty-badge/quest-difficulty-badge'
import { Progress } from '@/components/ui/shadcn/progress'

import { QuestStatusIcon } from './quest-status-icon'

const STATUS_LABEL: Record<Quest['status'], string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  'not-started': 'Not started',
}

const STATUS_LABEL_CLASSNAME: Record<Quest['status'], string> = {
  completed: 'text-secondary',
  'in-progress': 'text-primary',
  'not-started': 'text-muted-foreground',
}

// Clicking the status icon cycles a quest through its lifecycle.
const NEXT_STATUS: Record<QuestStatus, QuestStatus> = {
  'not-started': 'in-progress',
  'in-progress': 'completed',
  completed: 'not-started',
}

interface QuestListItemProps {
  quest: Quest
  className?: string
  /** Called with the next status when the status icon is clicked, to cycle it. */
  onStatusChange?: (status: QuestStatus) => void
}

/** A single row in the Quest Log: status, name, difficulty, points and status label. */
export function QuestListItem({ quest, className, onStatusChange }: QuestListItemProps) {
  const { name, difficulty, status, questPoints } = quest
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
          <span className="stat-value whitespace-nowrap text-sm sm:text-base">
            {questPoints} QP
          </span>
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
            aria-label={`View "${name}" quest details`}
            className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {status === 'in-progress' && (
        <Progress value={45} variant="default" className="ml-8" aria-label={`${name} progress`} />
      )}

      <QuestDetailModal quest={quest} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </div>
  )
}
