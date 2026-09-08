'use client'

import { useState } from 'react'

import { DiaryRegion, DiaryTier, DiaryTierName, DiaryTierStatus } from '@/lib/types/diary'
import { cn } from '@/lib/utils'

import { DiaryTierCard } from '@/components/ui/diary-tier-card/diary-tier-card'
import { DiaryTierDetailModal } from '@/components/ui/diary-tier-detail-modal/diary-tier-detail-modal'

interface DiaryRegionCardProps {
  region: DiaryRegion
  className?: string
  /** Called with the clicked tier's name and a task's index when its checkbox is toggled. */
  onToggleTask?: (tier: DiaryTier['tier'], taskIndex: number) => void
}

/** A region's diary card: name + tier-completion summary, with a grid of its 4 tiers. */
export function DiaryRegionCard({ region, className, onToggleTask }: DiaryRegionCardProps) {
  // Track only the *name* of the open tier, not the tier object itself — the
  // object is rebuilt (new reference, updated `completed`/`status`) every
  // time `completedByTask` changes upstream, so holding onto a snapshot would
  // leave the modal showing stale data after checking off a task.
  const [openTierName, setOpenTierName] = useState<DiaryTierName | null>(null)
  const selectedTier = region.tiers.find((tier) => tier.tier === openTierName) ?? null
  const tiersComplete = region.tiers.filter(
    (tier) => tier.status === DiaryTierStatus.complete
  ).length

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
          <DiaryTierCard key={tier.tier} tier={tier} onClick={() => setOpenTierName(tier.tier)} />
        ))}
      </div>

      <DiaryTierDetailModal
        regionName={region.name}
        tier={selectedTier}
        open={selectedTier !== null}
        onOpenChange={(open) => !open && setOpenTierName(null)}
        onToggleTask={
          onToggleTask && selectedTier
            ? (taskIndex) => onToggleTask(selectedTier.tier, taskIndex)
            : undefined
        }
      />
    </section>
  )
}
