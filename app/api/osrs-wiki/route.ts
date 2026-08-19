/**
 * API proxy for the OSRS Wiki (MediaWiki) API.
 * Bypasses CORS and lets us attach a proper User-Agent, as required by the
 * wiki's API etiquette: https://oldschool.runescape.wiki/w/Help:API
 *
 * Supported query params:
 *   mode=search  &q=<term>     -> action=query&list=search
 *   mode=summary &title=<page> -> action=query&prop=extracts (intro only)
 *   mode=quests                -> action=query&list=embeddedin (Infobox Quest)
 *   mode=details &title=<page> -> action=parse&prop=wikitext (Quest details/rewards)
 *
 * See `build-wiki-params.ts` for how each mode maps to upstream params.
 */
import { buildWikiParams } from './build-wiki-params'

const WIKI_API_BASE = 'https://oldschool.runescape.wiki/api.php'
const USER_AGENT = 'Questly/1.0 (https://github.com/Khanfur/questly)'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('mode')

  const result = buildWikiParams(mode, searchParams)
  if ('error' in result) {
    return result.error
  }

  try {
    const url = `${WIKI_API_BASE}?${result.params.toString()}`

    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
    })

    if (!response.ok) {
      return new Response(null, { status: response.status })
    }

    const json = await response.json()
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `Failed to fetch from OSRS Wiki: ${(error as Error).message}`,
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    )
  }
}
