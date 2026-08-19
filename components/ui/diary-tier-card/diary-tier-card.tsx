import type { DiaryTier, DiaryTierName } from '@/lib/types/diary'
import { cn } from '@/lib/utils'
import { Check, Lock, MoreHorizontal } from 'lucide-react'

const TIER_LABEL: Record<DiaryTierName, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  elite: 'Elite',
}

const TIER_BAR_CLASSNAME: Record<DiaryTierName, string> = {
  easy: 'bg-secondary',
  medium: 'bg-sky-500',
  hard: 'bg-amber-500',
  elite: 'bg-foreground',
}

const STATUS_LABEL: Record<DiaryTier['status'], string> = {
  complete: 'Complete',
  'in-progress': 'In progress',
  'not-started': 'Not started',
  locked: 'Locked',
}

const STATUS_CLASSNAME: Record<DiaryTier['status'], string> = {
  complete: 'text-secondary',
  'in-progress': 'text-primary',
  'not-started': 'text-muted-foreground',
  locked: 'text-muted-foreground/70',
}

interface DiaryTierCardProps {
  tier: DiaryTier
  className?: string
}

/** A single diary tier tile (Easy/Medium/Hard/Elite) showing task progress + status. */
export function DiaryTierCard({ tier, className }: DiaryTierCardProps) {
  const { tier: tierName, status, completedTasks, totalTasks } = tier
  const percentComplete = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
  const isLocked = status === 'locked'

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-sm border border-border bg-muted/40 p-3',
        isLocked && 'opacity-70',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="label text-foreground">{TIER_LABEL[tierName]}</span>
        {status === 'complete' && (
          <Check className="size-3.5 text-secondary" aria-hidden="true" strokeWidth={3} />
        )}
        {status === 'in-progress' && (
          <MoreHorizontal className="size-3.5 text-primary" aria-hidden="true" />
        )}
        {status === 'locked' && (
          <Lock className="size-3 text-muted-foreground/70" aria-hidden="true" />
        )}
      </div>

      <span className="text-xs text-muted-foreground">
        {completedTasks} / {totalTasks} tasks
      </span>

      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted-foreground/15"
        role="progressbar"
        aria-valuenow={percentComplete}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn('h-full rounded-full transition-all', TIER_BAR_CLASSNAME[tierName])}
          style={{ width: `${percentComplete}%` }}
        />
      </div>

      <span className={cn('label', STATUS_CLASSNAME[status])}>{STATUS_LABEL[status]}</span>
    </div>
  )
}
