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
}

/** A difficulty tier (Novice, Intermediate, ...) and the quests within it. */
export type QuestTier = {
  difficulty: QuestDifficulty
  quests: Quest[]
}
