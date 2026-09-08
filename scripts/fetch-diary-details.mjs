/**
 * Bulk-fetches full Achievement Diary metadata — region name, members flag,
 * and every difficulty tier's tasks (description + requirements) — for
 * every OSRS diary region, by requesting each page's wikitext
 * (`action=parse`) and scraping its `{{Infobox Achievement Diary}}` and
 * per-tier `data-diary-tier="..."` task tables. Writes a generated array
 * matching the `WikiDiaryDetails` type (`lib/types/osrs-wiki/osrs-wiki.ts`)
 * to `lib/data/diary/diary-details.ts`.
 *
 * Unlike `fetch-diary-list.mjs` (one cheap paginated request for every
 * title), this is one request *per region* (~12 requests), so:
 *   - requests are spaced out with a short delay to be polite to the wiki
 *   - a single region can be refreshed/added without refetching everything
 *
 * Usage:
 *   npm run fetch:diary-details                            -> refetch every region
 *   npm run fetch:diary-details -- --title "Ardougne Diary" -> fetch/update just that one
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { fetchDiaryList } from './fetch-diary-list.mjs'
import { parseDiaryDetails } from './lib/wiki-diary-parser.mjs'

const WIKI_API_BASE = 'https://oldschool.runescape.wiki/api.php'
const USER_AGENT = 'Questly/1.0 (https://github.com/Khanfur/questly)'
const OUTPUT_PATH = fileURLToPath(new URL('../lib/data/diary/diary-details.ts', import.meta.url))
const REQUEST_DELAY_MS = 250

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Fetches and parses a single diary region page's details by title. */
export async function fetchDiaryDetails(title) {
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

  return parseDiaryDetails(json.parse.pageid, json.parse.title, wikitext)
}

/** Reads the existing generated array back out of `lib/data/diary/diary-details.ts`, if present. */
export function readExistingDiaryDetails(path = OUTPUT_PATH) {
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
export function upsertDiaryDetails(existing, entry) {
  const next = existing.filter((d) => d.pageId !== entry.pageId)
  next.push(entry)
  next.sort((a, b) => a.pageId - b.pageId)
  return next
}

export function toModuleSource(diaryDetails, generatedAt = new Date()) {
  return `/**
 * Full Achievement Diary metadata (region name, members flag, and every
 * difficulty tier's tasks with per-task requirements) for every OSRS diary
 * region, scraped from each page's \`{{Infobox Achievement Diary}}\` and
 * per-tier task tables via the wiki's \`action=parse\` endpoint.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate all: npm run fetch:diary-details
 * Update one: npm run fetch:diary-details -- --title "Region Diary"
 * Last generated: ${generatedAt.toISOString()}
 * Count: ${diaryDetails.length} diaries
 */
import type { WikiDiaryDetails } from '@/lib/types/osrs-wiki'

export const diaryDetails: WikiDiaryDetails[] = ${JSON.stringify(diaryDetails, null, 2)}
`
}

async function writeFormatted(diaryDetails) {
  const source = toModuleSource(diaryDetails)
  const prettier = await import('prettier')
  const config = (await prettier.resolveConfig(OUTPUT_PATH)) ?? {}
  const formatted = await prettier.format(source, { ...config, filepath: OUTPUT_PATH })
  writeFileSync(OUTPUT_PATH, formatted)
}

async function fetchAll() {
  const diaries = await fetchDiaryList()
  console.log(`Fetching details for ${diaries.length} diaries...`)

  const results = []
  for (const [index, diary] of diaries.entries()) {
    try {
      results.push(await fetchDiaryDetails(diary.title))
    } catch (err) {
      console.warn(`  Skipping "${diary.title}": ${err.message}`)
    }

    if ((index + 1) % 20 === 0 || index === diaries.length - 1) {
      console.log(`  ...${index + 1}/${diaries.length}`)
    }
    await sleep(REQUEST_DELAY_MS)
  }

  results.sort((a, b) => a.pageId - b.pageId)
  await writeFormatted(results)
  console.log(`Wrote ${results.length} diaries to ${OUTPUT_PATH}`)
}

async function fetchOne(title) {
  const details = await fetchDiaryDetails(title)
  const next = upsertDiaryDetails(readExistingDiaryDetails(), details)
  await writeFormatted(next)
  console.log(`Upserted "${details.title}" (pageId ${details.pageId}) into ${OUTPUT_PATH}`)
}

async function main() {
  const args = process.argv.slice(2)
  const titleFlagIndex = args.indexOf('--title')

  if (titleFlagIndex !== -1) {
    const title = args[titleFlagIndex + 1]
    if (!title) {
      console.error('Usage: npm run fetch:diary-details -- --title "Region Diary"')
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
