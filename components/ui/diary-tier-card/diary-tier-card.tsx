import { DiaryTier, DiaryTierName, DiaryTierStatus } from '@/lib/types/diary'
import { cn } from '@/lib/utils'
import { Check, MoreHorizontal } from 'lucide-react'

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
}

const STATUS_CLASSNAME: Record<DiaryTier['status'], string> = {
  complete: 'text-secondary',
  'in-progress': 'text-primary',
  'not-started': 'text-muted-foreground',
}

interface DiaryTierCardProps {
  tier: DiaryTier
  className?: string
  /** If provided, renders the tile as a button (e.g. to open its task detail modal). */
  onClick?: () => void
}

/** A single diary tier tile (Easy/Medium/Hard/Elite) showing task progress + status. */
export function DiaryTierCard({ tier, className, onClick }: DiaryTierCardProps) {
  const { tier: tierName, status, completedTasks, totalTasks } = tier
  const percentComplete = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
  const Tag = onClick ? 'button' : 'div'

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'flex flex-col gap-2 rounded-sm border border-border bg-muted/40 p-3',
        onClick && 'text-left transition-colors hover:border-primary/50',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="label text-foreground">{TIER_LABEL[tierName]}</span>
        {status === DiaryTierStatus.complete && (
          <Check className="size-3.5 text-secondary" aria-hidden="true" strokeWidth={3} />
        )}
        {status === DiaryTierStatus.inProgress && (
          <MoreHorizontal className="size-3.5 text-primary" aria-hidden="true" />
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
    </Tag>
  )
}
