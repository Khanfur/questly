import type { Quest } from '@/lib/types/quest/quest'
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

interface QuestFieldProps {
  label: string
  children: import('react').ReactNode
}

/** A single labelled field in the two-column stats grid, e.g. "Difficulty: Novice". */
function QuestField({ label, children }: QuestFieldProps) {
  return (
    <div>
      <p className="section-heading text-muted-foreground">{label}</p>
      <p className="font-heading font-bold text-foreground">{children}</p>
    </div>
  )
}

interface QuestDetailListProps {
  label: string
  items: string[]
}

/** A labelled bullet list, e.g. items required or enemies to defeat. */
function QuestDetailList({ label, items }: QuestDetailListProps) {
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

interface QuestDetailModalProps {
  quest: Quest | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Quest details dialog, modelled on the in-game quest journal popup: how to
 * start, a stats grid (difficulty/length/storyline/quest points/release date),
 * then requirements/items/enemies sections — each only rendered when we have
 * that data. Requirements aren't struck through like in-game, since we've no
 * way to know which of the player's *other* quests are already complete.
 */
export function QuestDetailModal({ quest, open, onOpenChange }: QuestDetailModalProps) {
  if (!quest) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle className="font-heading text-xl text-primary">{quest.name}</DialogTitle>
            <QuestDifficultyBadge difficulty={quest.difficulty} />
            {quest.members && <Badge variant="secondary">Members</Badge>}
          </div>
          {quest.start && <DialogDescription>{quest.start}</DialogDescription>}
        </DialogHeader>

        <SectionDivider />

        <div className="grid grid-cols-2 gap-4">
          <QuestField label="Difficulty">
            {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
          </QuestField>
          <QuestField label="Length">{quest.length ?? 'Unknown'}</QuestField>
          <QuestField label="Storyline">{quest.series ?? 'None'}</QuestField>
          <QuestField label="Quest Points">{quest.questPoints}</QuestField>
          <QuestField label="Released">{quest.releaseDate ?? 'Unknown'}</QuestField>
        </div>

        {quest.description && (
          <>
            <SectionDivider />
            <div>
              <p className="section-heading mb-2 text-muted-foreground">Description</p>
              <p className="text-sm leading-relaxed text-foreground">{quest.description}</p>
            </div>
          </>
        )}

        {quest.requirements && quest.requirements.length > 0 && (
          <>
            <SectionDivider />
            <QuestDetailList label="Requirements" items={quest.requirements} />
          </>
        )}

        {quest.itemsRequired && quest.itemsRequired.length > 0 && (
          <>
            <SectionDivider />
            <QuestDetailList label="Items Required" items={quest.itemsRequired} />
          </>
        )}

        {quest.enemies && quest.enemies.length > 0 && (
          <>
            <SectionDivider />
            <QuestDetailList label="Enemies to Defeat" items={quest.enemies} />
          </>
        )}

        {quest.wikiUrl && (
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={
                <a href={quest.wikiUrl} target="_blank" rel="noreferrer">
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
