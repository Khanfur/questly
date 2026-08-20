import type { WikiMiniquestDetails, WikiQuestDetails } from '@/lib/types/osrs-wiki/osrs-wiki'
import {
  DIFFICULTY_ORDER,
  Miniquest,
  Quest,
  QuestDifficulty,
  QuestStatus,
  QuestTier,
} from '@/lib/types/quest/quest'

/**
 * Builds the full Quest Log (every difficulty tier, in order) from the generated
 * `questDetails` data (`lib/data/quest-details.ts`), applying each quest's
 * locally-tracked completion status (there's no OSRS API that exposes per-quest
 * completion, only aggregate quest points via Hiscores — see `useQuestProgress`).
 *
 * Wiki sub-pages that transclude `{{Infobox Quest}}` but aren't standalone quests
 * (e.g. `Recipe for Disaster/Freeing Pirate Pete`, `Recipe for Disaster/Full guide`)
 * are identified by their `/` and excluded, along with any quest whose difficulty
 * still can't be resolved. Quests not yet released (proposed/upcoming quests the
 * wiki documents ahead of time, e.g. "The Graveyard") are also excluded, so they
 * don't appear in the list or count towards quest/quest point totals.
 */
export function buildQuestLog(
  questDetails: WikiQuestDetails[],
  statusByQuest: Record<string, QuestStatus>
): QuestTier[] {
  return DIFFICULTY_ORDER.map((tierDifficulty) => ({
    difficulty: tierDifficulty,
    quests: questDetails
      .filter((details) => !details.title.includes('/'))
      .filter((details) => details.released)
      .filter(
        (details) =>
          details.difficulty === tierDifficulty
      )
      .map((details) =>
        toQuest(details, tierDifficulty, statusByQuest[details.title] ?? 'not-started')
      )
      .sort((a, b) => a.name.localeCompare(b.name)),
  }))
}

function toQuest(
  details: WikiQuestDetails,
  difficulty: QuestDifficulty,
  status: QuestStatus
): Quest {
  return {
    name: details.title,
    difficulty,
    status,
    questPoints: details.questPoints ?? 0,
    requires:
      details.requirements && details.requirements.length > 0
        ? details.requirements.join(', ')
        : 'None',
    members: details.members,
    start: details.start,
    description: details.description,
    series: details.series,
    length: details.length,
    enemies: details.enemies,
    itemsRequired: details.itemsRequired,
    wikiUrl: details.wikiUrl,
    requirements: details.requirements,
    releaseDate: details.releaseDate,
  }
}

/**
 * Builds the full Miniquests list from the generated `miniquestDetails` data
 * (`lib/data/miniquest-details.ts`), applying each miniquest's locally-tracked
 * completion status. Unlike quests, miniquests aren't grouped into difficulty
 * tiers (the Quest Log's tiers/totals are for the 200+ full quests; miniquests
 * are a much smaller, separate category — see
 * https://oldschool.runescape.wiki/w/Miniquests) and award no quest points, so
 * they must never be folded into `buildQuestLog`'s totals.
 *
 * Wiki sub-pages and not-yet-released miniquests are excluded, same as `buildQuestLog`.
 */
export function buildMiniquestLog(
  miniquestDetails: WikiMiniquestDetails[],
  statusByMiniquest: Record<string, QuestStatus>
): Miniquest[] {
  return miniquestDetails
    .filter((details) => !details.title.includes('/'))
    .filter((details) => details.released)
    .map((details) => toMiniquest(details, statusByMiniquest[details.title] ?? 'not-started'))
    .sort((a, b) => {
      const aOrder = a.difficulty ? DIFFICULTY_ORDER.indexOf(a.difficulty) : DIFFICULTY_ORDER.length
      const bOrder = b.difficulty ? DIFFICULTY_ORDER.indexOf(b.difficulty) : DIFFICULTY_ORDER.length
      return aOrder !== bOrder ? aOrder - bOrder : a.name.localeCompare(b.name)
    })
}

function toMiniquest(details: WikiMiniquestDetails, status: QuestStatus): Miniquest {
  return {
    name: details.title,
    difficulty: details.difficulty,
    status,
    requires:
      details.requirements && details.requirements.length > 0
        ? details.requirements.join(', ')
        : 'None',
    members: details.members,
    start: details.start,
    description: details.description,
    series: details.series,
    length: details.length,
    enemies: details.enemies,
    itemsRequired: details.itemsRequired,
    wikiUrl: details.wikiUrl,
    requirements: details.requirements,
    releaseDate: details.releaseDate,
  }
}
