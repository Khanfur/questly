'use client'

import { groupDiaryRequirements } from '@/lib/diary-requirements'
import { splitDiaryTaskNote } from '@/lib/diary-task-description'
import { DiaryTier, DiaryTierName } from '@/lib/types/diary'
import { cn } from '@/lib/utils'

import { SectionDivider } from '@/components/ui/section-divider/section-divider'
import { Checkbox } from '@/components/ui/shadcn/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/shadcn/dialog'

const TIER_LABEL: Record<DiaryTierName, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  elite: 'Elite',
}

interface DiaryTierDetailModalProps {
  regionName: string
  tier: DiaryTier | null
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Called with a task's index within the tier when its checkbox is toggled. */
  onToggleTask?: (taskIndex: number) => void
}

/**
 * A diary tier's task checklist, modelled on the in-game Achievement Diary
 * journal: every task's description, requirements (if any), and a checkbox
 * to mark it done — there's no OSRS API for per-task diary completion, so
 * this is entirely self-reported (see `useDiaryProgress`).
 */
export function DiaryTierDetailModal({
  regionName,
  tier,
  open,
  onOpenChange,
  onToggleTask,
}: DiaryTierDetailModalProps) {
  if (!tier) return null

  const tasks = tier.tasks ?? []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-primary">
            {regionName} &mdash; {TIER_LABEL[tier.tier]}
          </DialogTitle>
          <DialogDescription>
            {tier.completedTasks} / {tier.totalTasks} tasks complete
          </DialogDescription>
        </DialogHeader>

        <SectionDivider />

        {tasks.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {tasks.map((task, index) => {
              const { description, note } = splitDiaryTaskNote(task.description)

              return (
                <li key={index} className="flex items-start gap-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={onToggleTask ? () => onToggleTask(index) : undefined}
                    aria-label={`Mark "${task.description}" as ${task.completed ? 'not completed' : 'completed'}`}
                    className="mt-0.5 shrink-0"
                  />
                  <div className="min-w-0">
                    <p
                      className={cn(
                        'text-sm text-foreground',
                        task.completed && 'text-muted-foreground line-through'
                      )}
                    >
                      {description}
                    </p>
                    {note && <p className="mt-0.5 text-xs text-muted-foreground italic">{note}</p>}
                    {task.requirements.length > 0 && (
                      <div className="mt-1 flex flex-col gap-0.5">
                        {groupDiaryRequirements(task.requirements).map((group) => (
                          <p key={group.category} className="text-xs text-muted-foreground">
                            <span className="font-semibold text-foreground/70">{group.label}:</span>{' '}
                            {group.requirements.join(', ')}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No task data available for this tier.</p>
        )}
      </DialogContent>
    </Dialog>
  )
}
