/**
 * One-off script that bulk-fetches the full OSRS quest list directly from
 * the wiki's MediaWiki API (bypassing the Next.js dev server, since this
 * runs standalone via `npm run fetch:quests`) and writes it out as a static
 * TypeScript module at `lib/data/quest/quest-list.ts`.
 *
 * This only fetches page titles/ids (one `list=embeddedin` query, paginated
 * via `eicontinue`) — cheap enough to run in a handful of requests. Fetching
 * full per-quest details (difficulty, requirements, etc. via
 * `fetchQuestDetails`) for every quest would mean one `action=parse` request
 * per quest (~180 requests) and is intentionally left for on-demand fetching
 * elsewhere rather than baked into this snapshot.
 *
 * Re-run with: npm run fetch:quests
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const WIKI_API_BASE = 'https://oldschool.runescape.wiki/api.php'
const USER_AGENT = 'Questly/1.0 (https://github.com/Khanfur/questly)'
const OUTPUT_PATH = fileURLToPath(new URL('../lib/data/quest/quest-list.ts', import.meta.url))

export async function fetchQuestList() {
  const quests = []
  let eicontinue

  do {
    const params = new URLSearchParams({
      format: 'json',
      formatversion: '2',
      action: 'query',
      list: 'embeddedin',
      eititle: 'Template:Infobox Quest',
      einamespace: '0',
      eilimit: '500',
    })
    if (eicontinue) params.set('eicontinue', eicontinue)

    const res = await fetch(`${WIKI_API_BASE}?${params.toString()}`, {
      headers: { 'User-Agent': USER_AGENT },
    })
    if (!res.ok) {
      throw new Error(`OSRS Wiki request failed with status ${res.status}`)
    }

    const json = await res.json()
    for (const page of json.query?.embeddedin ?? []) {
      quests.push({ pageId: page.pageid, title: page.title })
    }
    eicontinue = json.continue?.eicontinue
  } while (eicontinue)

  return quests
}

export function toModuleSource(quests, generatedAt = new Date()) {
  const entries = quests
    .map((q) => `  { pageId: ${q.pageId}, title: ${JSON.stringify(q.title)} },`)
    .join('\n')

  return `/**
 * Full list of OSRS quest titles/page ids, snapshotted from the wiki's
 * \`list=embeddedin\` (Template:Infobox Quest) query.
 *
 * GENERATED FILE — do not hand-edit. Regenerate with: npm run fetch:quests
 * Last generated: ${generatedAt.toISOString()}
 * Count: ${quests.length} quests
 */
import type { WikiQuestListItem } from '@/lib/types/osrs-wiki/osrs-wiki'

export const questList: WikiQuestListItem[] = [
${entries}
]
`
}

async function main() {
  const quests = await fetchQuestList()
  quests.sort((a, b) => a.pageId - b.pageId)

  const source = toModuleSource(quests)
  const prettier = await import('prettier')
  const config = (await prettier.resolveConfig(OUTPUT_PATH)) ?? {}
  const formatted = await prettier.format(source, { ...config, filepath: OUTPUT_PATH })

  writeFileSync(OUTPUT_PATH, formatted)
  console.log(`Wrote ${quests.length} quests to ${OUTPUT_PATH}`)
}

// Only run the fetch+write when executed directly (`node scripts/fetch-quest-list.mjs`),
// not when imported (e.g. by tests) for its exported helper functions.
const isMainModule = fileURLToPath(import.meta.url) === process.argv[1]
if (isMainModule) {
  main()
}
