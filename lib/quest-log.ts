import type { WikiQuestDetails } from '@/lib/types/osrs-wiki'
import type { Quest, QuestDifficulty, QuestStatus, QuestTier } from '@/lib/types/quest'

const DIFFICULTY_ORDER: QuestDifficulty[] = [
  'novice',
  'intermediate',
  'experienced',
  'master',
  'grandmaster',
]

// A handful of quest pages on the wiki use a difficulty rating (e.g. "Special")
// that doesn't map to one of our five `QuestDifficulty` tiers, so `WikiQuestDetails.difficulty`
// comes back `null` for them. Recipe for Disaster is the only standalone quest (not a
// wiki sub-page — see below) affected; it's commonly treated as a master-tier quest.
const DIFFICULTY_FALLBACK_BY_TITLE: Partial<Record<string, QuestDifficulty>> = {
  'Recipe for Disaster': 'master',
}

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
          (details.difficulty ?? DIFFICULTY_FALLBACK_BY_TITLE[details.title]) === tierDifficulty
      )
      .map((details) =>
        toQuest(details, tierDifficulty, statusByQuest[details.title] ?? 'not-started')
      ),
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
