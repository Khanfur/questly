/**
 * Shared wikitext-parsing helpers used by `scripts/fetch-quest-details.mjs`.
 *
 * Mirrors the parsing logic in `lib/integrations/osrs-wiki/quest-details.ts`
 * (kept separate rather than shared, since that module is a React-facing
 * client hook file and this one is a plain Node script with no TS build
 * step — see that file for the on-demand/single-quest equivalent used by
 * the app at runtime).
 */

const DIFFICULTY_BY_NAME = {
  novice: 'novice',
  intermediate: 'intermediate',
  experienced: 'experienced',
  master: 'master',
  grandmaster: 'grandmaster',
}

/**
 * Extracts the raw wikitext of the first `{{TemplateName ... }}` transclusion
 * in `wikitext`, matching nested `{{ }}` pairs so multi-line templates aren't
 * cut short.
 */
export function extractTemplateBlock(wikitext, templateName) {
  const start = new RegExp(`\\{\\{\\s*${templateName}\\b`, 'i').exec(wikitext)
  if (!start) return null

  let depth = 0
  let i = start.index
  const from = i
  while (i < wikitext.length) {
    if (wikitext.startsWith('{{', i)) {
      depth++
      i += 2
    } else if (wikitext.startsWith('}}', i)) {
      depth--
      i += 2
      if (depth === 0) return wikitext.slice(from, i)
    } else {
      i++
    }
  }
  return null
}

/** Parses top-level `|field = value` pairs out of a template block extracted by `extractTemplateBlock`. */
export function parseTemplateFields(block) {
  const fields = {}
  const inner = block.replace(/^\{\{\s*[^\n|]+/, '').replace(/\}\}$/, '')

  const fieldPattern = /\|\s*([A-Za-z0-9_]+)\s*=\s*([\s\S]*?)(?=\n\s*\|[A-Za-z0-9_]+\s*=|$)/g
  let match
  while ((match = fieldPattern.exec(inner))) {
    fields[match[1]] = match[2].trim()
  }
  return fields
}

/** Reduces wikitext markup (`[[links]]`, `{{templates}}`, `'''bold'''`) to plain display text. */
export function stripWikitext(value) {
  return value
    .replace(/\{\{[^{}]*\}\}/g, '')
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]*)\]\]/g, '$1')
    .replace(/'{2,}/g, '')
    .replace(/\n+/g, ' ')
    .trim()
}

/**
 * Parses a wikitext bullet list (e.g. a `kills` field) into plain-text items,
 * one per top-level `*` bullet — nested `**` sub-bullets are ignored, since
 * fields like `kills` only use nesting for grouping/notes, not extra items.
 */
export function parseBulletList(value) {
  return value
    .split('\n')
    .filter((line) => /^\*(?!\*)/.test(line.trim()))
    .map((line) => stripWikitext(line.trim().replace(/^\*\s*/, '')))
    .filter((line) => line.length > 0)
}

/** Builds the canonical OSRS Wiki URL for a page title. */
export function buildWikiUrl(title) {
  return `https://oldschool.runescape.wiki/w/${encodeURIComponent(title.replace(/ /g, '_'))}`
}

/**
 * Parses a quest page's wikitext into a `WikiQuestDetails`-shaped plain
 * object (difficulty, length, members, series, quest points, start,
 * description, requirements, enemies, items required, wiki link), by scraping the
 * `{{Infobox Quest}}`, `{{Quest details}}`, and `{{Quest rewards}}` templates.
 */
export function parseQuestDetails(pageId, title, wikitext) {
  const infobox = extractTemplateBlock(wikitext, 'Infobox Quest')
  const details = extractTemplateBlock(wikitext, 'Quest details')
  const rewards = extractTemplateBlock(wikitext, 'Quest rewards')

  const infoboxFields = infobox ? parseTemplateFields(infobox) : {}
  const detailsFields = details ? parseTemplateFields(details) : {}
  const rewardsFields = rewards ? parseTemplateFields(rewards) : {}

  const difficulty = DIFFICULTY_BY_NAME[detailsFields.difficulty?.toLowerCase() ?? ''] ?? null
  const series =
    infoboxFields.series && infoboxFields.series !== 'None' ? infoboxFields.series : null
  const questPoints = rewardsFields.qp ? Number(rewardsFields.qp) : null

  return {
    pageId,
    title,
    difficulty,
    length: detailsFields.length ? stripWikitext(detailsFields.length) : null,
    members: infoboxFields.members?.toLowerCase() === 'yes',
    series: series ? stripWikitext(series) : null,
    questPoints: questPoints !== null && !Number.isNaN(questPoints) ? questPoints : null,
    start: detailsFields.start ? stripWikitext(detailsFields.start) : null,
    description: detailsFields.description ? stripWikitext(detailsFields.description) : null,
    requirements: detailsFields.requirements ? stripWikitext(detailsFields.requirements) : null,
    enemies: detailsFields.kills ? parseBulletList(detailsFields.kills) : null,
    itemsRequired: detailsFields.items ? parseBulletList(detailsFields.items) : null,
    wikiUrl: buildWikiUrl(title),
  }
}
