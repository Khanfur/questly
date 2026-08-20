export const QuestStatus = {
  Completed: 'completed',
  InProgress: 'in-progress',
  NotStarted: 'not-started',
}

export type QuestStatus = typeof QuestStatus[keyof typeof QuestStatus]

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

/**
 * A miniquest — a smaller, self-contained objective (see
 * https://oldschool.runescape.wiki/w/Miniquests). Unlike a `Quest`,
 * miniquests have no world-map icon and award no quest points, so they're
 * tracked in their own list and are **not** counted towards the Quest Log's
 * total quest / quest point counts.
 */
export type Miniquest = {
  name: string
  difficulty: QuestDifficulty | null
  status: QuestStatus
  /** Human-readable prerequisites, e.g. "Tree Gnome Village, The Grand Tree". */
  requires: string
  /** Whether this miniquest requires a members (P2P) account. */
  members: boolean
  /** How the miniquest is started, e.g. "Speak to Marlo in north-east Varrock." */
  start?: string | null
  /** Plain-text synopsis of the miniquest, if available. */
  description?: string | null
  /** Quest series this miniquest belongs to, e.g. "Dragonkin, #3". */
  series?: string | null
  /** Rough play-time estimate, e.g. "Short", "Very Long". */
  length?: string | null
  /** Enemies the player must defeat during the miniquest, if any. */
  enemies?: string[] | null
  /** Items required to start/complete the miniquest, if any. */
  itemsRequired?: string[] | null
  /** Full breakdown of `requires` as individual requirements, if available. */
  requirements?: string[] | null
  /** Plain-text release date, e.g. "4 January 2001", if available. */
  releaseDate?: string | null
  /** Direct link to the miniquest's page on the OSRS Wiki. */
  wikiUrl?: string
}
