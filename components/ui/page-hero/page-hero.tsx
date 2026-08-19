import { cn } from '@/lib/utils'

interface PageHeroProps {
  eyebrow: string
  /** Each line is rendered as its own heading, e.g. ["293 quests.", "You've earned..."] */
  titleLines: string[]
  description: import('react').ReactNode
  /** e.g. a `ViewToggle` switching between sibling views. */
  actions?: import('react').ReactNode
  /** e.g. a `StatCardGroup` summarising progress. */
  stats?: import('react').ReactNode
  className?: string
}

/**
 * Shared hero banner for top-level pages: eyebrow + multi-line title + description,
 * with optional action row (view toggle) and stat summary below.
 */
export function PageHero({
  eyebrow,
  titleLines,
  description,
  actions,
  stats,
  className,
}: PageHeroProps) {
  return (
    <div className={cn('flex flex-col items-center gap-4 text-center', className)}>
      <span className="eyebrow">{eyebrow}</span>

      <div>
        {titleLines.map((line) => (
          <h1 key={line}>{line}</h1>
        ))}
      </div>

      <p className="max-w-2xl">{description}</p>

      {actions}

      {stats}
    </div>
  )
}
