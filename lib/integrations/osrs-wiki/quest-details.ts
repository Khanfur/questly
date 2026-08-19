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
 * Parses top-level `|field = value` pairs out of a template block extracted
 * by `extractTemplateBlock`. Values may themselves contain nested templates
 * or links (e.g. `requirements`, `items`) — those are left as raw wikitext
 * here and cleaned up by `stripWikitext` where a plain-text value is needed.
 */
function parseTemplateFields(block: string): Record<string, string> {
  const fields: Record<string, string> = {}
  const inner = block.replace(/^\{\{\s*[^\n|]+/, '').replace(/\}\}$/, '')

  const fieldPattern = /\|\s*([A-Za-z0-9_]+)\s*=\s*([\s\S]*?)(?=\n\s*\|[A-Za-z0-9_]+\s*=|$)/g
  let match: RegExpExecArray | null
  while ((match = fieldPattern.exec(inner))) {
    fields[match[1]] = match[2].trim()
  }
  return fields
}

/** Reduces wikitext markup (`[[links]]`, `{{templates}}`, `'''bold'''`) to plain display text. */
function stripWikitext(value: string): string {
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
 * start, description, requirements, enemies, items required, wiki link) by scraping the
 * `{{Infobox Quest}}`, `{{Quest details}}`, and `{{Quest rewards}}` templates
 * out of a quest page's raw wikitext. Unlike `fetchQuestList`, this requires
 * one `action=parse` request per page — there's no MediaWiki/Cargo query
 * endpoint on this wiki that returns structured quest data across many pages
 * at once.
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
    start: detailsFields.start ? stripWikitext(detailsFields.start) : null,
    description: detailsFields.description ? stripWikitext(detailsFields.description) : null,
    requirements: detailsFields.requirements ? stripWikitext(detailsFields.requirements) : null,
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
