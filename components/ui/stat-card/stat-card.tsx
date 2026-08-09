import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  stat: number | string
  secondaryStat?: number | string
  className?: string
}

export function StatCard({ label, stat, secondaryStat, className }: StatCardProps) {
  return (
    <div className={cn('stat-card', className)}>
      <span className="label text-muted-foreground">{label}</span>
      <p className="stat-value tabular-nums">
        {stat}
        {secondaryStat !== undefined && (
          <>
            {' / '}
            {secondaryStat}
          </>
        )}
      </p>
    </div>
  )
}
