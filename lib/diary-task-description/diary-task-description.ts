/**
 * Splits a diary task's `Note: ...` aside (common in scraped task
 * descriptions, e.g. "Buy a newspaper. Note: Can be bought from Benny in
 * Varrock Square.") out of its main description, so the UI can render the
 * note in a smaller, de-emphasized style instead of inline with the task.
 *
 * Only the first "Note:" is treated as the split point — descriptions with
 * a literal second "Note:" (rare) keep it as part of the note text.
 */
export interface DiaryTaskDescription {
  description: string
  note: string | null
}

const NOTE_PATTERN = /\bNote:\s*/

export function splitDiaryTaskNote(description: string): DiaryTaskDescription {
  const match = NOTE_PATTERN.exec(description)
  if (!match) return { description, note: null }

  const mainText = description.slice(0, match.index).trim()
  const note = description.slice(match.index + match[0].length).trim()

  return { description: mainText, note: note.length > 0 ? note : null }
}
