import { useEffect, useRef } from 'react'

import type { Miniquest } from '@/lib/types/quest/quest'
import { ExternalLink } from 'lucide-react'

import { QuestDifficultyBadge } from '@/components/ui/quest-difficulty-badge/quest-difficulty-badge'
import { SectionDivider } from '@/components/ui/section-divider/section-divider'
import { Badge } from '@/components/ui/shadcn/badge'
import { Button } from '@/components/ui/shadcn/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/shadcn/dialog'

interface MiniquestFieldProps {
  label: string
  children: import('react').ReactNode
}

/** A single labelled field in the two-column stats grid, e.g. "Length: Short". */
function MiniquestField({ label, children }: MiniquestFieldProps) {
  return (
    <div>
      <p className="section-heading text-muted-foreground">{label}</p>
      <p className="font-heading font-bold text-foreground">{children}</p>
    </div>
  )
}

interface MiniquestDetailListProps {
  label: string
  items: string[]
}

/** A labelled bullet list, e.g. items required or enemies to defeat. */
function MiniquestDetailList({ label, items }: MiniquestDetailListProps) {
  return (
    <div>
      <p className="section-heading mb-2 text-muted-foreground">{label}</p>
      <ul className="flex flex-col gap-1 text-sm text-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-primary" aria-hidden="true">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface MiniquestDetailModalProps {
  miniquest: Miniquest | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Miniquest details dialog — mirrors `QuestDetailModal`, but miniquests have
 * no quest points to show and their difficulty may be unrated (`null`), so
 * that field is omitted rather than shown as "Unknown".
 */
export function MiniquestDetailModal({ miniquest, open, onOpenChange }: MiniquestDetailModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  // The dialog's popup can stay mounted between opens (for close animations),
  // so its scroll position otherwise carries over from the previous time it
  // was opened. Reset it to the top each time the dialog opens.
  useEffect(() => {
    if (open) contentRef.current?.scrollTo({ top: 0 })
  }, [open, miniquest])

  if (!miniquest) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent ref={contentRef} className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle className="font-heading text-xl text-primary">
              {miniquest.name}
            </DialogTitle>
            <QuestDifficultyBadge difficulty={miniquest.difficulty} />
            {miniquest.members && <Badge variant="secondary">Members</Badge>}
          </div>
          {miniquest.start && <DialogDescription>{miniquest.start}</DialogDescription>}
        </DialogHeader>

        <SectionDivider />

        <div className="grid grid-cols-2 gap-4">
          <MiniquestField label="Length">{miniquest.length ?? 'Unknown'}</MiniquestField>
          <MiniquestField label="Storyline">{miniquest.series ?? 'None'}</MiniquestField>
          <MiniquestField label="Released">{miniquest.releaseDate ?? 'Unknown'}</MiniquestField>
        </div>

        {miniquest.description && (
          <>
            <SectionDivider />
            <div>
              <p className="section-heading mb-2 text-muted-foreground">Description</p>
              <p className="text-sm leading-relaxed text-foreground">{miniquest.description}</p>
            </div>
          </>
        )}

        {miniquest.requirements && miniquest.requirements.length > 0 && (
          <>
            <SectionDivider />
            <MiniquestDetailList label="Requirements" items={miniquest.requirements} />
          </>
        )}

        {miniquest.itemsRequired && miniquest.itemsRequired.length > 0 && (
          <>
            <SectionDivider />
            <MiniquestDetailList label="Items Required" items={miniquest.itemsRequired} />
          </>
        )}

        {miniquest.enemies && miniquest.enemies.length > 0 && (
          <>
            <SectionDivider />
            <MiniquestDetailList label="Enemies to Defeat" items={miniquest.enemies} />
          </>
        )}

        {miniquest.wikiUrl && (
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={
                <a href={miniquest.wikiUrl} target="_blank" rel="noreferrer">
                  <ExternalLink data-icon="inline-start" />
                  View on Wiki
                </a>
              }
            />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
