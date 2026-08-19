import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  stat: number | string
  secondaryStat?: number | string
  /** Optional line rendered below the stat, e.g. the in-progress quest name. */
  caption?: import('react').ReactNode
  captionClassName?: string
  className?: string
  loading?: boolean
}

export function StatCard({
  label,
  stat,
  secondaryStat,
  caption,
  captionClassName,
  className,
  loading = false,
}: StatCardProps) {
  return (
    <div className={cn('stat-card', className)}>
      <span className="label text-muted-foreground">{label}</span>
      {loading ? (
        <div className="h-[1em] w-16 animate-pulse rounded bg-muted" aria-hidden="true" />
      ) : (
        <>
          <p className="stat-value tabular-nums">
            {stat}
            {secondaryStat !== undefined && (
              <>
                {' / '}
                {secondaryStat}
              </>
            )}
          </p>
          {caption && (
            <span className={cn('text-xs font-medium text-primary', captionClassName)}>
              {caption}
            </span>
          )}
        </>
      )}
    </div>
  )
}
