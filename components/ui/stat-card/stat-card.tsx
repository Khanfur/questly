import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  stat: number | string
  secondaryStat?: number | string
  className?: string
  loading?: boolean
}

export function StatCard({
  label,
  stat,
  secondaryStat,
  className,
  loading = false,
}: StatCardProps) {
  return (
    <div className={cn('stat-card', className)}>
      <span className="label text-muted-foreground">{label}</span>
      {loading ? (
        <div className="h-[1em] w-16 animate-pulse rounded bg-muted" aria-hidden="true" />
      ) : (
        <p className="stat-value tabular-nums">
          {stat}
          {secondaryStat !== undefined && (
            <>
              {' / '}
              {secondaryStat}
            </>
          )}
        </p>
      )}
    </div>
  )
}
