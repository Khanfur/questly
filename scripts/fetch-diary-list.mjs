/**
 * One-off script that bulk-fetches the full Achievement Diary region list
 * directly from the wiki's MediaWiki API (bypassing the Next.js dev server,
 * since this runs standalone via `npm run fetch:diaries`) and writes it out
 * as a static TypeScript module at `lib/data/diary/diary-list.ts`.
 *
 * Every diary region page transcludes `Template:Infobox Achievement Diary`,
 * found via one `list=embeddedin` query (paginated via `eicontinue`) —
 * mirrors `fetch-quest-list.mjs`. That query also picks up "Steam
 * Achievements" (a false-positive page that embeds the template without
 * being a real diary region), so results are filtered to titles ending in
 * " Diary".
 *
 * Re-run with: npm run fetch:diaries
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const WIKI_API_BASE = 'https://oldschool.runescape.wiki/api.php'
const USER_AGENT = 'Questly/1.0 (https://github.com/Khanfur/questly)'
const OUTPUT_PATH = fileURLToPath(new URL('../lib/data/diary/diary-list.ts', import.meta.url))

export async function fetchDiaryList() {
  const diaries = []
  let eicontinue

  do {
    const params = new URLSearchParams({
      format: 'json',
      formatversion: '2',
      action: 'query',
      list: 'embeddedin',
      eititle: 'Template:Infobox Achievement Diary',
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
      if (!/\bDiary$/.test(page.title)) continue // Drops "Steam Achievements", etc.
      diaries.push({ pageId: page.pageid, title: page.title })
    }
    eicontinue = json.continue?.eicontinue
  } while (eicontinue)

  return diaries
}

export function toModuleSource(diaries, generatedAt = new Date()) {
  const entries = diaries
    .map((d) => `  { pageId: ${d.pageId}, title: ${JSON.stringify(d.title)} },`)
    .join('\n')

  return `/**
 * Full list of OSRS Achievement Diary region titles/page ids, snapshotted
 * from the wiki's \`list=embeddedin\` (Template:Infobox Achievement Diary) query.
 *
 * GENERATED FILE — do not hand-edit. Regenerate with: npm run fetch:diaries
 * Last generated: ${generatedAt.toISOString()}
 * Count: ${diaries.length} diaries
 */
import type { WikiDiaryListItem } from '@/lib/types/osrs-wiki'

export const diaryList: WikiDiaryListItem[] = [
${entries}
]
`
}

async function main() {
  const diaries = await fetchDiaryList()
  diaries.sort((a, b) => a.pageId - b.pageId)

  const source = toModuleSource(diaries)
  const prettier = await import('prettier')
  const config = (await prettier.resolveConfig(OUTPUT_PATH)) ?? {}
  const formatted = await prettier.format(source, { ...config, filepath: OUTPUT_PATH })

  writeFileSync(OUTPUT_PATH, formatted)
  console.log(`Wrote ${diaries.length} diaries to ${OUTPUT_PATH}`)
}

// Only run the fetch+write when executed directly (`node scripts/fetch-diary-list.mjs`),
// not when imported (e.g. by tests) for its exported helper functions.
const isMainModule = fileURLToPath(import.meta.url) === process.argv[1]
if (isMainModule) {
  main()
}
