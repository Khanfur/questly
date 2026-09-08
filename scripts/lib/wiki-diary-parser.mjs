/**
 * Shared wikitext-parsing helpers used by `scripts/fetch-diary-details.mjs`.
 *
 * Achievement Diary region pages (e.g. "Ardougne Diary") lay out each
 * difficulty tier's tasks in a `{{Infobox Achievement Diary}}` (region-level
 * metadata) followed by one `data-diary-tier="Easy|Medium|Hard|Elite"`
 * wikitable per tier, with a `Task` / `Requirements` column pair — see
 * https://oldschool.runescape.wiki/w/Ardougne_Diary. This reuses the generic
 * template/bullet-list helpers from `wiki-quest-parser.mjs` rather than
 * duplicating them.
 */
import {
  buildWikiUrl,
  extractTemplateBlock,
  parseBulletList,
  parseTemplateFields,
  stripWikitext,
} from './wiki-quest-parser.mjs'

const DIARY_TIER_NAMES = ['Easy', 'Medium', 'Hard', 'Elite']

/**
 * Extracts the raw wikitext of the `{| ... data-diary-tier="TierName" ... |}`
 * table for a single tier, matching from the nearest preceding `{|` up to
 * the table's closing `|}` line.
 */
export function extractDiaryTierTable(wikitext, tierName) {
  const marker = new RegExp(`data-diary-tier\\s*=\\s*"${tierName}"`, 'i').exec(wikitext)
  if (!marker) return null

  const tableStart = wikitext.lastIndexOf('{|', marker.index)
  if (tableStart === -1) return null

  const tableEnd = wikitext.indexOf('\n|}', marker.index)
  if (tableEnd === -1) return null

  return wikitext.slice(tableStart, tableEnd)
}

/**
 * Parses a tier's task table (as extracted by `extractDiaryTierTable`) into
 * a flat list of `{ description, requirements }` tasks, one per table row.
 * Each row's first cell is the task's plain-text description (its leading
 * "1. " ordinal is stripped, since ordering is already implied by array
 * position); the second cell is a bullet list of requirements — often a mix
 * of `{{SCP|Skill|Level}}` skill/quest-point requirements and item links, or
 * `{{NA|None}}` when the task has none (yielding an empty array).
 */
export function parseDiaryTasks(tableBlock) {
  if (!tableBlock) return []

  const bodyStart = tableBlock.indexOf('\n|-')
  if (bodyStart === -1) return []

  const rows = tableBlock.slice(bodyStart).split(/\n\|-[^\n]*/).slice(1)

  const tasks = []
  for (const row of rows) {
    const cells = []
    let current = null

    for (const line of row.split('\n')) {
      if (/^\|(?!\|)/.test(line)) {
        if (current !== null) cells.push(current.join('\n'))
        current = [line.slice(1)]
      } else if (current !== null) {
        current.push(line)
      }
    }
    if (current !== null) cells.push(current.join('\n'))
    if (cells.length < 2) continue

    const description = stripWikitext(cells[0]).replace(/^\d+\.\s*/, '')
    if (!description) continue

    tasks.push({ description, requirements: parseBulletList(cells[1]) })
  }
  return tasks
}

/**
 * Parses an Achievement Diary region page's wikitext into a
 * `WikiDiaryDetails`-shaped plain object: region name (the page title with
 * its trailing " Diary" stripped), members flag, and every tier's tasks.
 */
export function parseDiaryDetails(pageId, title, wikitext) {
  const infobox = extractTemplateBlock(wikitext, 'Infobox Achievement Diary')
  const infoboxFields = infobox ? parseTemplateFields(infobox) : {}

  const tiers = DIARY_TIER_NAMES.map((tierName) => ({
    tier: tierName.toLowerCase(),
    tasks: parseDiaryTasks(extractDiaryTierTable(wikitext, tierName)),
  }))

  return {
    pageId,
    title,
    name: title.replace(/\s*Diary\s*$/i, '').trim(),
    members: infoboxFields.members?.toLowerCase() === 'yes',
    tiers,
    wikiUrl: buildWikiUrl(title),
  }
}
