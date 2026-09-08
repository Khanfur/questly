'use client'

import { useCallback, useEffect, useState } from 'react'

import { DiaryTierName } from '@/lib/types/diary'
import type {
  UseDiaryDetailsResult,
  WikiDiaryDetails,
  WikiDiaryTask,
  WikiDiaryTierDetails,
} from '@/lib/types/osrs-wiki'
import { WikiError } from '@/lib/types/osrs-wiki'
import type { FetchWikiOptions } from '@/lib/types/osrs-wiki'

import { DEFAULT_BASE_URL, wikiFetch } from './client'

interface RawParseResponse {
  parse?: {
    title: string
    pageid: number
    wikitext?: string
  }
}

const DIARY_TIER_NAMES = [
  DiaryTierName.easy,
  DiaryTierName.medium,
  DiaryTierName.hard,
  DiaryTierName.elite,
] as const

/**
 * Extracts the raw wikitext of the first `{{TemplateName ... }}` transclusion
 * in `wikitext`, matching nested `{{ }}` pairs so multi-line templates aren't
 * cut short.
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
 * text — see `quest-details.ts`'s equivalent for details.
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
 * Parses a wikitext bullet list into plain-text items, one per top-level `*`
 * bullet — nested `**` sub-bullets are ignored.
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
 * Extracts the raw wikitext of the `{| ... data-diary-tier="TierName" ... |}`
 * table for a single tier — see `wiki-diary-parser.mjs`'s equivalent (the
 * standalone-script version of this same logic).
 */
function extractDiaryTierTable(wikitext: string, tierName: string): string | null {
  const marker = new RegExp(`data-diary-tier\\s*=\\s*"${tierName}"`, 'i').exec(wikitext)
  if (!marker) return null

  const tableStart = wikitext.lastIndexOf('{|', marker.index)
  if (tableStart === -1) return null

  const tableEnd = wikitext.indexOf('\n|}', marker.index)
  if (tableEnd === -1) return null

  return wikitext.slice(tableStart, tableEnd)
}

/** Parses a tier's task table (as extracted by `extractDiaryTierTable`) into a flat task list. */
function parseDiaryTasks(tableBlock: string | null): WikiDiaryTask[] {
  if (!tableBlock) return []

  const bodyStart = tableBlock.indexOf('\n|-')
  if (bodyStart === -1) return []

  const rows = tableBlock
    .slice(bodyStart)
    .split(/\n\|-[^\n]*/)
    .slice(1)

  const tasks: WikiDiaryTask[] = []
  for (const row of rows) {
    const cells: string[] = []
    let current: string[] | null = null

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
 * Fetches Achievement Diary region metadata (name, members flag, and every
 * difficulty tier's tasks) by scraping the `{{Infobox Achievement Diary}}`
 * template and per-tier `data-diary-tier="..."` task tables out of a diary
 * region page's raw wikitext. Unlike `fetchDiaryList`, this requires one
 * `action=parse` request per page — see `fetchQuestDetails` for the quest
 * equivalent.
 */
export async function fetchDiaryDetails(
  title: string,
  options: FetchWikiOptions = {}
): Promise<WikiDiaryDetails> {
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

  const infobox = extractTemplateBlock(wikitext, 'Infobox Achievement Diary')
  const infoboxFields = infobox ? parseTemplateFields(infobox) : {}

  const tiers: WikiDiaryTierDetails[] = DIARY_TIER_NAMES.map((tierName) => ({
    tier: tierName,
    tasks: parseDiaryTasks(
      extractDiaryTierTable(wikitext, tierName.charAt(0).toUpperCase() + tierName.slice(1))
    ),
  }))

  return {
    pageId: json.parse.pageid,
    title: json.parse.title,
    name: json.parse.title.replace(/\s*Diary\s*$/i, '').trim(),
    members: infoboxFields.members?.toLowerCase() === 'yes',
    tiers,
    wikiUrl: buildWikiUrl(json.parse.title),
  }
}

/** Fetches a single diary region's details on mount (and whenever `title` changes or `refetch` is called). */
export function useDiaryDetails(
  title: string | null,
  options: FetchWikiOptions = {}
): UseDiaryDetailsResult {
  const [data, setData] = useState<WikiDiaryDetails | null>(null)
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

    fetchDiaryDetails(title, { ...options, signal: controller.signal })
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
