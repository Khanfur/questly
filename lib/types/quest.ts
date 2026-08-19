export type QuestStatus = 'completed' | 'in-progress' | 'not-started'

export type QuestInfo = {
  name: string
  status: QuestStatus
}

export type QuestDifficulty = 'novice' | 'intermediate' | 'experienced' | 'master' | 'grandmaster'

/** A single entry in the full Quest Log list, grouped by `difficulty`. */
export type Quest = {
  name: string
  difficulty: QuestDifficulty
  status: QuestStatus
  /** Quest points awarded on completion. */
  questPoints: number
  /** Human-readable prerequisites, e.g. "Tree Gnome Village, The Grand Tree". */
  requires: string
  /** Optional flavour note shown next to the requirements, e.g. "Ten minutes, tops." */
  note?: string
  /** Whether this quest requires a members (P2P) account. */
  members: boolean
  /** How the quest is started, e.g. "Talk to the Cook in the kitchen of Lumbridge Castle." */
  start?: string | null
  /** Plain-text synopsis of the quest, if available. */
  description?: string | null
  /** Quest series this quest belongs to, e.g. "Dragonkin, #3". */
  series?: string | null
  /** Rough play-time estimate, e.g. "Short", "Very Long". */
  length?: string | null
  /** Enemies the player must defeat during the quest, if any. */
  enemies?: string[] | null
  /** Items required to start/complete the quest, if any. */
  itemsRequired?: string[] | null
  /** Full breakdown of `requires` as individual requirements, if available (for the detail modal). */
  requirements?: string[] | null
  /** Plain-text release date, e.g. "4 January 2001", if available. */
  releaseDate?: string | null
  /** Direct link to the quest's page on the OSRS Wiki. */
  wikiUrl?: string
}

/** A difficulty tier (Novice, Intermediate, ...) and the quests within it. */
export type QuestTier = {
  difficulty: QuestDifficulty
  quests: Quest[]
}
