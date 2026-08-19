import type { DiaryRegion } from '@/lib/types/diary/diary'
import { cn } from '@/lib/utils'

import { DiaryTierCard } from '@/components/ui/diary-tier-card/diary-tier-card'

interface DiaryRegionCardProps {
  region: DiaryRegion
  className?: string
}

/** A region's diary card: name + tier-completion summary, with a grid of its 4 tiers. */
export function DiaryRegionCard({ region, className }: DiaryRegionCardProps) {
  const tiersComplete = region.tiers.filter((tier) => tier.status === 'complete').length

  return (
    <section
      className={cn('flex flex-col gap-3 rounded-sm border border-border bg-card p-4', className)}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h4>{region.name}</h4>
        <span className="text-sm text-muted-foreground">
          {tiersComplete} / {region.tiers.length} tiers complete
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {region.tiers.map((tier) => (
          <DiaryTierCard key={tier.tier} tier={tier} />
        ))}
      </div>
    </section>
  )
}
