'use client'

import { useCallback, useEffect, useState } from 'react'

import type {
  FetchWikiOptions,
  UseMiniquestDetailsResult,
  WikiMiniquestDetails,
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

const MONTH_NAMES = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

/**
 * Determines whether a miniquest has actually been released yet — mirrors
 * `isQuestReleased` in `quest-details.ts`.
 */
function isMiniquestReleased(releaseDateText: string | null, now: Date = new Date()): boolean {
  const text = (releaseDateText ?? '').trim()
  if (!text) return false

  const yearMatch = /\b(\d{4})\b/.exec(text)
  if (!yearMatch) return false
  const year = Number(yearMatch[1])

  const currentYear = now.getFullYear()
  if (year > currentYear) return false
  if (year < currentYear) return true

  const monthMatch = new RegExp(`\\b(${MONTH_NAMES.join('|')})\\b`, 'i').exec(text)
  if (!monthMatch) return true // Same year, no month found — assume already released.

  const month = MONTH_NAMES.indexOf(monthMatch[1].toLowerCase())
  return month <= now.getMonth()
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
 * Splits template contents on top-level `|` characters — see the equivalent
 * helper in `quest-details.ts` for the full rationale.
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

/** Parses top-level `|field = value` pairs out of a template block extracted by `extractTemplateBlock`. */
function parseTemplateFields(block: string): Record<string, string> {
  const fields: Record<string, string> = {}
  const inner = block.replace(/^\{\{\s*[^\n|]+/, '').replace(/\}\}$/, '')

  for (const part of splitTopLevelPipes(inner)) {
    const match = /^\s*([A-Za-z0-9_]+)\s*=[ \t]*([\s\S]*)$/.exec(part)
    if (!match) continue
    fields[match[1]] = match[2].trim()
  }
  return fields
}

/**
 * Expands `{{SCP|Skill|Level}}` "skill clickpic" templates into readable
 * text — see the equivalent helper in `quest-details.ts`.
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
 * Parses a `requirements` field into a flat list of plain-text requirements —
 * see `parseRequirements` in `quest-details.ts` for the full rationale.
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
 * Parses a wikitext bullet list (e.g. an `items` field) into plain-text
 * items, one per top-level `*` bullet.
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
 * Fetches miniquest metadata (difficulty, length, members, series, release
 * date, released status, start, description, requirements, enemies, items
 * required, wiki link) by scraping the `{{Infobox Miniquest}}` and
 * `{{Quest details}}` templates out of a miniquest page's raw wikitext.
 * Unlike `fetchMiniquestList`, this requires one `action=parse` request per
 * page. Miniquests award no quest points, so unlike `fetchQuestDetails`
 * there's no `{{Quest rewards}}` template to scrape.
 */
export async function fetchMiniquestDetails(
  title: string,
  options: FetchWikiOptions = {}
): Promise<WikiMiniquestDetails> {
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

  const infobox = extractTemplateBlock(wikitext, 'Infobox Miniquest')
  const details = extractTemplateBlock(wikitext, 'Quest details')

  const infoboxFields = infobox ? parseTemplateFields(infobox) : {}
  const detailsFields = details ? parseTemplateFields(details) : {}

  const difficulty = DIFFICULTY_BY_NAME[detailsFields.difficulty?.toLowerCase() ?? ''] ?? null
  const series =
    infoboxFields.series && infoboxFields.series !== 'None' ? infoboxFields.series : null
  const releaseDate = infoboxFields.release ? stripWikitext(infoboxFields.release) : null

  return {
    pageId: json.parse.pageid,
    title: json.parse.title,
    difficulty,
    length: detailsFields.length ? stripWikitext(detailsFields.length) : null,
    members: infoboxFields.members?.toLowerCase() === 'yes',
    series: series ? stripWikitext(series) : null,
    releaseDate,
    released: isMiniquestReleased(releaseDate),
    start: detailsFields.start ? stripWikitext(detailsFields.start) : null,
    description: detailsFields.description ? stripWikitext(detailsFields.description) : null,
    requirements: detailsFields.requirements ? parseRequirements(detailsFields.requirements) : null,
    enemies: detailsFields.kills ? parseBulletList(detailsFields.kills) : null,
    itemsRequired: detailsFields.items ? parseBulletList(detailsFields.items) : null,
    wikiUrl: buildWikiUrl(json.parse.title),
  }
}

/** Fetches a single miniquest's details on mount (and whenever `title` changes or `refetch` is called). */
export function useMiniquestDetails(
  title: string | null,
  options: FetchWikiOptions = {}
): UseMiniquestDetailsResult {
  const [data, setData] = useState<WikiMiniquestDetails | null>(null)
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

    fetchMiniquestDetails(title, { ...options, signal: controller.signal })
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
