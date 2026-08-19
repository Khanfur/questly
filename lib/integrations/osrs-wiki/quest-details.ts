'use client'

import { useCallback, useEffect, useState } from 'react'

import type {
  FetchWikiOptions,
  UseQuestDetailsResult,
  WikiQuestDetails,
} from '@/lib/types/osrs-wiki'
import { WikiError } from '@/lib/types/osrs-wiki'
import type { QuestDifficulty } from '@/lib/types/quest'

import { DEFAULT_BASE_URL, wikiFetch } from './client'

interface RawParseResponse {
  parse?: {
    title: string
    pageid: number
    wikitext?: string
  }
}

const DIFFICULTY_BY_NAME: Record<string, QuestDifficulty> = {
  novice: 'novice',
  intermediate: 'intermediate',
  experienced: 'experienced',
  master: 'master',
  grandmaster: 'grandmaster',
}

/**
 * Extracts the raw wikitext of the first `{{TemplateName ... }}` transclusion
 * in `wikitext`, matching nested `{{ }}` pairs so multi-line templates (which
 * often embed other templates like `{{SCP|...}}`) aren't cut short.
 */
function extractTemplateBlock(wikitext: string, templateName: string): string | null {
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

/**
 * Splits template contents on top-level `|` characters, i.e. pipes that
 * aren't nested inside a `{{template}}` or `[[link]]` — those pipes
 * separate the template's *own* parameters (e.g. `[[File:x.png|centre]]`,
 * `{{SCP|Agility|10|link=yes}}`), not this template's fields. MediaWiki
 * templates are frequently written as a single line
 * (`{{Quest rewards|name=...|image=...|qp=5|rewards=...}}`), so field
 * boundaries can't be reliably found with a newline-anchored regex.
 */
function splitTopLevelPipes(inner: string): string[] {
  const parts: string[] = []
  let depth = 0
  let current = ''

  for (let i = 0; i < inner.length; i++) {
    const two = inner.slice(i, i + 2)
    if (two === '{{' || two === '[[') {
      depth++
      current += two
      i++
    } else if (two === '}}' || two === ']]') {
      depth = Math.max(0, depth - 1)
      current += two
      i++
    } else if (inner[i] === '|' && depth === 0) {
      parts.push(current)
      current = ''
    } else {
      current += inner[i]
    }
  }
  parts.push(current)
  return parts
}

/**
 * Parses top-level `|field = value` pairs out of a template block extracted
 * by `extractTemplateBlock`. Values may themselves contain nested templates
 * or links (e.g. `requirements`, `items`) — those are left as raw wikitext
 * here and cleaned up by `stripWikitext` where a plain-text value is needed.
 */
function parseTemplateFields(block: string): Record<string, string> {
  const fields: Record<string, string> = {}
  const inner = block.replace(/^\{\{\s*[^\n|]+/, '').replace(/\}\}$/, '')

  for (const part of splitTopLevelPipes(inner)) {
    // The value only eats spaces/tabs after "=" (not `\s*`, which would also
    // consume the newline before an otherwise-empty field's value).
    const match = /^\s*([A-Za-z0-9_]+)\s*=[ \t]*([\s\S]*)$/.exec(part)
    if (!match) continue
    fields[match[1]] = match[2].trim()
  }
  return fields
}

/**
 * Expands `{{SCP|Skill|Level}}` "skill clickpic" templates (used throughout
 * requirement/recommended lists) into readable text, e.g. `{{SCP|Agility|10}}`
 * -> "Agility level 10", `{{SCP|Quest|200}}` -> "200 Quest Points" — otherwise
 * these are silently deleted by the generic template-stripping below, which
 * loses the actual requirement (e.g. leaving a bare, empty bullet).
 */
function expandSkillClickpics(value: string): string {
  return value.replace(/\{\{\s*SCP\s*\|([^{}]*)\}\}/gi, (_match, paramsStr: string) => {
    const params = paramsStr.split('|').map((p) => p.trim())
    const skill = params[0]
    const level = params[1] && /^\d+$/.test(params[1]) ? params[1] : null
    if (!skill) return ''
    if (!level) return skill
    return /^quest$/i.test(skill) ? `${level} Quest Points` : `${skill} level ${level}`
  })
}

/** Reduces wikitext markup (`[[links]]`, `{{templates}}`, `'''bold'''`) to plain display text. */
function stripWikitext(value: string): string {
  return expandSkillClickpics(value)
    .replace(/\{\{[^{}]*\}\}/g, '')
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]*)\]\]/g, '$1')
    .replace(/'{2,}/g, '')
    .replace(/\n+/g, ' ')
    .trim()
}

/**
 * Parses a `requirements` field into a flat list of plain-text requirements.
 *
 * Requirement lists mix flat skill/quest-point bullets (`* {{SCP|Agility|10}}`)
 * with a nested "Completion of the following quests:" bullet whose children
 * are the actual prerequisite quests — and the wiki often keeps expanding
 * *those* quests' own prerequisites two, three, even eight bullets deep for
 * reader convenience (e.g. Song of the Elves). We only want the direct
 * prerequisites, so only depth-1 bullets and the depth-2 children of a
 * "Completion of the following quest(s)" header are kept; anything nested
 * deeper (transitive prerequisite chains) is dropped.
 */
function parseRequirements(value: string): string[] | null {
  const results: string[] = []
  let underQuestHeader = false

  for (const rawLine of value.split('\n')) {
    const line = rawLine.trim()
    if (!line) continue

    const depthMatch = /^(\*+)\s*(.*)$/.exec(line)
    if (!depthMatch) continue

    const depth = depthMatch[1].length
    const text = stripWikitext(depthMatch[2])
    if (!text) continue

    if (depth === 1) {
      underQuestHeader = /completion of the following quests?/i.test(text)
      if (!underQuestHeader) results.push(text)
    } else if (depth === 2 && underQuestHeader && !text.endsWith(':')) {
      results.push(`Completion of ${text}`)
    }
  }

  return results.length > 0 ? results : null
}

/**
 * Parses a wikitext bullet list (e.g. a `kills` field) into plain-text items,
 * one per top-level `*` bullet — nested `**` sub-bullets are ignored, since
 * fields like `kills` only use nesting for grouping/notes, not extra items.
 */
function parseBulletList(value: string): string[] {
  return value
    .split('\n')
    .filter((line) => /^\*(?!\*)/.test(line.trim()))
    .map((line) => stripWikitext(line.trim().replace(/^\*\s*/, '')))
    .filter((line) => line.length > 0)
}

/** Builds the canonical OSRS Wiki URL for a page title. */
function buildWikiUrl(title: string): string {
  return `https://oldschool.runescape.wiki/w/${encodeURIComponent(title.replace(/ /g, '_'))}`
}

/**
 * Fetches quest metadata (difficulty, length, members, series, quest points,
 * release date, start, description, requirements, enemies, items required,
 * wiki link) by scraping the `{{Infobox Quest}}`, `{{Quest details}}`, and
 * `{{Quest rewards}}` templates out of a quest page's raw wikitext. Unlike
 * `fetchQuestList`, this requires one `action=parse` request per page —
 * there's no MediaWiki/Cargo query endpoint on this wiki that returns
 * structured quest data across many pages at once.
 */
export async function fetchQuestDetails(
  title: string,
  options: FetchWikiOptions = {}
): Promise<WikiQuestDetails> {
  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL
  const url = `${baseUrl}?mode=details&title=${encodeURIComponent(title)}`

  const json = await wikiFetch<RawParseResponse>(
    url,
    options.signal,
    `fetching details for "${title}"`
  )

  const wikitext = json.parse?.wikitext
  if (!json.parse || !wikitext) {
    throw new WikiError(`Wiki page "${title}" not found.`, 404)
  }

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
    pageId: json.parse.pageid,
    title: json.parse.title,
    difficulty,
    length: detailsFields.length ? stripWikitext(detailsFields.length) : null,
    members: infoboxFields.members?.toLowerCase() === 'yes',
    series: series ? stripWikitext(series) : null,
    questPoints: questPoints !== null && !Number.isNaN(questPoints) ? questPoints : null,
    releaseDate: infoboxFields.release ? stripWikitext(infoboxFields.release) : null,
    start: detailsFields.start ? stripWikitext(detailsFields.start) : null,
    description: detailsFields.description ? stripWikitext(detailsFields.description) : null,
    requirements: detailsFields.requirements ? parseRequirements(detailsFields.requirements) : null,
    enemies: detailsFields.kills ? parseBulletList(detailsFields.kills) : null,
    itemsRequired: detailsFields.items ? parseBulletList(detailsFields.items) : null,
    wikiUrl: buildWikiUrl(json.parse.title),
  }
}

/** Fetches a single quest's details on mount (and whenever `title` changes or `refetch` is called). */
export function useQuestDetails(
  title: string | null,
  options: FetchWikiOptions = {}
): UseQuestDetailsResult {
  const [data, setData] = useState<WikiQuestDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<WikiError | null>(null)
  const [refetchTick, setRefetchTick] = useState(0)

  const refetch = useCallback(() => setRefetchTick((t) => t + 1), [])

  useEffect(() => {
    if (!title) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setData(null)
      setError(null)
      /* eslint-enable react-hooks/set-state-in-effect */
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetchQuestDetails(title, { ...options, signal: controller.signal })
      .then((result) => {
        setData(result)
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setError(err instanceof WikiError ? err : new WikiError((err as Error).message))
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, options.baseUrl, refetchTick])

  return { data, loading, error, refetch }
}
