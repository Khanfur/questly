import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/shadcn/badge'
import {QuestDifficulty} from "@/lib/types";

const DIFFICULTY_CLASSNAME: Record<QuestDifficulty, string> = {
  novice: 'bg-muted text-muted-foreground',
  intermediate: 'bg-sky-500/15 text-sky-700 dark:text-sky-400',
  experienced: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  special: 'bg-orange-500/15 text-orange-700 dark:text-orange-400',
  master: 'bg-pink-500/15 text-pink-700 dark:text-pink-400',
  grandmaster: 'bg-foreground text-background',
}

interface QuestDifficultyBadgeProps {
  difficulty: QuestDifficulty
  className?: string
}

/** Colour-coded badge for a quest's difficulty tier. Renders nothing when `difficulty` is `null`. */
export function QuestDifficultyBadge({ difficulty, className }: QuestDifficultyBadgeProps) {
  if (!difficulty) return null

  return (
    <Badge className={cn(DIFFICULTY_CLASSNAME[difficulty], className)}>
      {difficulty}
    </Badge>
  )
}
