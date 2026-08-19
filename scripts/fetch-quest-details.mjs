/**
 * Bulk-fetches full quest metadata — difficulty, length, members, series,
 * quest points, start, description, requirements, enemies, items required — for every OSRS quest, by requesting
 * each page's wikitext (`action=parse`) and scraping its `{{Infobox Quest}}`
 * / `{{Quest details}}` / `{{Quest rewards}}` templates. Writes a generated
 * array matching the `WikiQuestDetails` type (`lib/types/osrs-wiki/osrs-wiki.ts`) to
 * `lib/data/quest/quest-details.ts`.
 *
 * Unlike `fetch-quest-list.mjs` (one cheap paginated request for every
 * title), this is one request *per quest* (~196 requests), so:
 *   - requests are spaced out with a short delay to be polite to the wiki
 *   - a single quest can be refreshed/added without refetching everything
 *
 * Usage:
 *   npm run fetch:quest-details                          -> refetch every quest
 *   npm run fetch:quest-details -- --title "Quest Name"   -> fetch/update just that one
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { fetchQuestList } from './fetch-quest-list.mjs'
import { parseQuestDetails } from './lib/wiki-quest-parser.mjs'

const WIKI_API_BASE = 'https://oldschool.runescape.wiki/api.php'
const USER_AGENT = 'Questly/1.0 (https://github.com/Khanfur/questly)'
const OUTPUT_PATH = fileURLToPath(new URL('../lib/data/quest/quest-details.ts', import.meta.url))
const REQUEST_DELAY_MS = 250

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Fetches and parses a single quest page's details by title. */
export async function fetchQuestDetails(title) {
  const params = new URLSearchParams({
    format: 'json',
    formatversion: '2',
    action: 'parse',
    page: title,
    prop: 'wikitext',
  })

  const res = await fetch(`${WIKI_API_BASE}?${params.toString()}`, {
    headers: { 'User-Agent': USER_AGENT },
  })
  if (!res.ok) {
    throw new Error(`OSRS Wiki request failed with status ${res.status}`)
  }

  const json = await res.json()
  const wikitext = json.parse?.wikitext
  if (!json.parse || !wikitext) {
    throw new Error(`Wiki page "${title}" not found.`)
  }

  return parseQuestDetails(json.parse.pageid, json.parse.title, wikitext)
}

/** Reads the existing generated array back out of `lib/data/quest/quest-details.ts`, if present. */
export function readExistingQuestDetails(path = OUTPUT_PATH) {
  if (!existsSync(path)) return []

  const content = readFileSync(path, 'utf8')
  const match = /=\s*(\[[\s\S]*\])\s*$/.exec(content.trim())
  if (!match) return []

  // Prettier formats the generated file with unquoted object keys where
  // possible (`quoteProps: "as-needed"`), so the array literal isn't valid
  // strict JSON — evaluate it as a JS expression instead. Safe here since
  // this file is only ever written by this script (trusted content).
  return new Function(`return (${match[1]})`)()
}

/** Replaces any existing entry with the same `pageId` and returns a pageId-sorted copy. */
export function upsertQuestDetails(existing, entry) {
  const next = existing.filter((q) => q.pageId !== entry.pageId)
  next.push(entry)
  next.sort((a, b) => a.pageId - b.pageId)
  return next
}

export function toModuleSource(questDetails, generatedAt = new Date()) {
  return `/**
 * Full quest metadata (difficulty, length, members, series, quest points,
 * start, description, requirements, enemies, items required, wiki link) for every OSRS
 * quest, scraped from each page's \`{{Infobox Quest}}\` / \`{{Quest details}}\`
 * / \`{{Quest rewards}}\` templates via the wiki's \`action=parse\` endpoint.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate all: npm run fetch:quest-details
 * Update one: npm run fetch:quest-details -- --title "Quest Name"
 * Last generated: ${generatedAt.toISOString()}
 * Count: ${questDetails.length} quests
 */
import type { WikiQuestDetails } from '@/lib/types/osrs-wiki/osrs-wiki'

export const questDetails: WikiQuestDetails[] = ${JSON.stringify(questDetails, null, 2)}
`
}

async function writeFormatted(questDetails) {
  const source = toModuleSource(questDetails)
  const prettier = await import('prettier')
  const config = (await prettier.resolveConfig(OUTPUT_PATH)) ?? {}
  const formatted = await prettier.format(source, { ...config, filepath: OUTPUT_PATH })
  writeFileSync(OUTPUT_PATH, formatted)
}

async function fetchAll() {
  const quests = await fetchQuestList()
  console.log(`Fetching details for ${quests.length} quests...`)

  const results = []
  for (const [index, quest] of quests.entries()) {
    try {
      results.push(await fetchQuestDetails(quest.title))
    } catch (err) {
      console.warn(`  Skipping "${quest.title}": ${err.message}`)
    }

    if ((index + 1) % 20 === 0 || index === quests.length - 1) {
      console.log(`  ...${index + 1}/${quests.length}`)
    }
    await sleep(REQUEST_DELAY_MS)
  }

  results.sort((a, b) => a.pageId - b.pageId)
  await writeFormatted(results)
  console.log(`Wrote ${results.length} quests to ${OUTPUT_PATH}`)
}

async function fetchOne(title) {
  const details = await fetchQuestDetails(title)
  const next = upsertQuestDetails(readExistingQuestDetails(), details)
  await writeFormatted(next)
  console.log(`Upserted "${details.title}" (pageId ${details.pageId}) into ${OUTPUT_PATH}`)
}

async function main() {
  const args = process.argv.slice(2)
  const titleFlagIndex = args.indexOf('--title')

  if (titleFlagIndex !== -1) {
    const title = args[titleFlagIndex + 1]
    if (!title) {
      console.error('Usage: npm run fetch:quest-details -- --title "Quest Name"')
      process.exitCode = 1
      return
    }
    await fetchOne(title)
    return
  }

  await fetchAll()
}

const isMainModule = fileURLToPath(import.meta.url) === process.argv[1]
if (isMainModule) {
  main()
}
