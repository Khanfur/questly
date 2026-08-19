/**
 * Bulk-fetches full miniquest metadata — difficulty, length, members,
 * series, start, description, requirements, enemies, items required — for
 * every OSRS miniquest, by requesting each page's wikitext (`action=parse`)
 * and scraping its `{{Infobox Miniquest}}` / `{{Quest details}}` templates.
 * Writes a generated array matching the `WikiMiniquestDetails` type
 * (`lib/types/osrs-wiki/osrs-wiki.ts`) to `lib/data/miniquest/miniquest-details.ts`.
 *
 * Mirrors `fetch-quest-details.mjs`, but miniquests award no quest points so
 * there's no `{{Quest rewards}}` block to scrape.
 *
 * Usage:
 *   npm run fetch:miniquest-details                          -> refetch every miniquest
 *   npm run fetch:miniquest-details -- --title "Miniquest Name"   -> fetch/update just that one
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { fetchMiniquestList } from './fetch-miniquest-list.mjs'
import { parseMiniquestDetails } from './lib/wiki-quest-parser.mjs'

const WIKI_API_BASE = 'https://oldschool.runescape.wiki/api.php'
const USER_AGENT = 'Questly/1.0 (https://github.com/Khanfur/questly)'
const OUTPUT_PATH = fileURLToPath(
  new URL('../lib/data/miniquest/miniquest-details.ts', import.meta.url)
)
const REQUEST_DELAY_MS = 250

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Fetches and parses a single miniquest page's details by title. */
export async function fetchMiniquestDetails(title) {
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

  return parseMiniquestDetails(json.parse.pageid, json.parse.title, wikitext)
}

/** Reads the existing generated array back out of `lib/data/miniquest/miniquest-details.ts`, if present. */
export function readExistingMiniquestDetails(path = OUTPUT_PATH) {
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
export function upsertMiniquestDetails(existing, entry) {
  const next = existing.filter((q) => q.pageId !== entry.pageId)
  next.push(entry)
  next.sort((a, b) => a.pageId - b.pageId)
  return next
}

export function toModuleSource(miniquestDetails, generatedAt = new Date()) {
  return `/**
 * Full miniquest metadata (difficulty, length, members, series, start,
 * description, requirements, enemies, items required, wiki link) for every
 * OSRS miniquest, scraped from each page's \`{{Infobox Miniquest}}\` /
 * \`{{Quest details}}\` templates via the wiki's \`action=parse\` endpoint.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate all: npm run fetch:miniquest-details
 * Update one: npm run fetch:miniquest-details -- --title "Miniquest Name"
 * Last generated: ${generatedAt.toISOString()}
 * Count: ${miniquestDetails.length} miniquests
 */
import type { WikiMiniquestDetails } from '@/lib/types/osrs-wiki/osrs-wiki'

export const miniquestDetails: WikiMiniquestDetails[] = ${JSON.stringify(miniquestDetails, null, 2)}
`
}

async function writeFormatted(miniquestDetails) {
  const source = toModuleSource(miniquestDetails)
  const prettier = await import('prettier')
  const config = (await prettier.resolveConfig(OUTPUT_PATH)) ?? {}
  const formatted = await prettier.format(source, { ...config, filepath: OUTPUT_PATH })
  writeFileSync(OUTPUT_PATH, formatted)
}

async function fetchAll() {
  const miniquests = await fetchMiniquestList()
  console.log(`Fetching details for ${miniquests.length} miniquests...`)

  const results = []
  for (const [index, miniquest] of miniquests.entries()) {
    try {
      results.push(await fetchMiniquestDetails(miniquest.title))
    } catch (err) {
      console.warn(`  Skipping "${miniquest.title}": ${err.message}`)
    }

    if ((index + 1) % 20 === 0 || index === miniquests.length - 1) {
      console.log(`  ...${index + 1}/${miniquests.length}`)
    }
    await sleep(REQUEST_DELAY_MS)
  }

  results.sort((a, b) => a.pageId - b.pageId)
  await writeFormatted(results)
  console.log(`Wrote ${results.length} miniquests to ${OUTPUT_PATH}`)
}

async function fetchOne(title) {
  const details = await fetchMiniquestDetails(title)
  const next = upsertMiniquestDetails(readExistingMiniquestDetails(), details)
  await writeFormatted(next)
  console.log(`Upserted "${details.title}" (pageId ${details.pageId}) into ${OUTPUT_PATH}`)
}

async function main() {
  const args = process.argv.slice(2)
  const titleFlagIndex = args.indexOf('--title')

  if (titleFlagIndex !== -1) {
    const title = args[titleFlagIndex + 1]
    if (!title) {
      console.error('Usage: npm run fetch:miniquest-details -- --title "Miniquest Name"')
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
