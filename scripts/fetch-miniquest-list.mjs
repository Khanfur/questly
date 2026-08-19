/**
 * One-off script that bulk-fetches the full OSRS miniquest list directly
 * from the wiki's MediaWiki API (bypassing the Next.js dev server, since
 * this runs standalone via `npm run fetch:miniquests`) and writes it out as
 * a static TypeScript module at `lib/data/miniquest-list.ts`.
 *
 * Miniquests are identified by embedding `Template:Infobox Miniquest`
 * (distinct from `Template:Infobox Quest` used by full quests — see
 * https://oldschool.runescape.wiki/w/Miniquests) — this only fetches page
 * titles/ids (one `list=embeddedin` query, paginated via `eicontinue`,
 * though there are only ~20 miniquests at time of writing).
 *
 * Re-run with: npm run fetch:miniquests
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const WIKI_API_BASE = 'https://oldschool.runescape.wiki/api.php'
const USER_AGENT = 'Questly/1.0 (https://github.com/Khanfur/questly)'
const OUTPUT_PATH = fileURLToPath(new URL('../lib/data/miniquest-list.ts', import.meta.url))

export async function fetchMiniquestList() {
  const miniquests = []
  let eicontinue

  do {
    const params = new URLSearchParams({
      format: 'json',
      formatversion: '2',
      action: 'query',
      list: 'embeddedin',
      eititle: 'Template:Infobox Miniquest',
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
      miniquests.push({ pageId: page.pageid, title: page.title })
    }
    eicontinue = json.continue?.eicontinue
  } while (eicontinue)

  return miniquests
}

export function toModuleSource(miniquests, generatedAt = new Date()) {
  const entries = miniquests
    .map((q) => `  { pageId: ${q.pageId}, title: ${JSON.stringify(q.title)} },`)
    .join('\n')

  return `/**
 * Full list of OSRS miniquest titles/page ids, snapshotted from the wiki's
 * \`list=embeddedin\` (Template:Infobox Miniquest) query.
 *
 * GENERATED FILE — do not hand-edit. Regenerate with: npm run fetch:miniquests
 * Last generated: ${generatedAt.toISOString()}
 * Count: ${miniquests.length} miniquests
 */
import type { WikiMiniquestListItem } from '@/lib/types/osrs-wiki'

export const miniquestList: WikiMiniquestListItem[] = [
${entries}
]
`
}

async function main() {
  const miniquests = await fetchMiniquestList()
  miniquests.sort((a, b) => a.pageId - b.pageId)

  const source = toModuleSource(miniquests)
  const prettier = await import('prettier')
  const config = (await prettier.resolveConfig(OUTPUT_PATH)) ?? {}
  const formatted = await prettier.format(source, { ...config, filepath: OUTPUT_PATH })

  writeFileSync(OUTPUT_PATH, formatted)
  console.log(`Wrote ${miniquests.length} miniquests to ${OUTPUT_PATH}`)
}

// Only run the fetch+write when executed directly (`node scripts/fetch-miniquest-list.mjs`),
// not when imported (e.g. by tests) for its exported helper functions.
const isMainModule = fileURLToPath(import.meta.url) === process.argv[1]
if (isMainModule) {
  main()
}
