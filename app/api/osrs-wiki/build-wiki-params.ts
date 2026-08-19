/**
 * Builds the upstream MediaWiki query params for each supported `mode`,
 * or returns an error Response if the mode/required params are invalid.
 * Kept separate from route.ts so the request-building logic can be
 * unit-tested and read independently of the HTTP plumbing.
 */

export type WikiParamsResult = { params: URLSearchParams } | { error: Response }

function errorResponse(message: string, status = 400): { error: Response } {
  return {
    error: new Response(JSON.stringify({ error: message }), {
      status,
      headers: { 'content-type': 'application/json' },
    }),
  }
}

export function buildWikiParams(
  mode: string | null,
  searchParams: URLSearchParams
): WikiParamsResult {
  const params = new URLSearchParams({
    format: 'json',
    formatversion: '2',
  })

  if (mode === 'search') {
    const query = searchParams.get('q')
    if (!query) return errorResponse('Missing q parameter')

    params.set('action', 'query')
    params.set('list', 'search')
    params.set('srsearch', query)
    return { params }
  }

  if (mode === 'summary') {
    const title = searchParams.get('title')
    if (!title) return errorResponse('Missing title parameter')

    params.set('action', 'query')
    params.set('prop', 'extracts')
    params.set('exintro', 'true')
    params.set('explaintext', 'true')
    params.set('redirects', '1')
    params.set('titles', title)
    return { params }
  }

  if (mode === 'details') {
    const title = searchParams.get('title')
    if (!title) return errorResponse('Missing title parameter')

    params.set('action', 'parse')
    params.set('page', title)
    params.set('prop', 'wikitext')
    return { params }
  }

  if (mode === 'quests') {
    const continueToken = searchParams.get('eicontinue')

    params.set('action', 'query')
    params.set('list', 'embeddedin')
    params.set('eititle', 'Template:Infobox Quest')
    params.set('einamespace', '0')
    params.set('eilimit', '500')
    if (continueToken) {
      params.set('eicontinue', continueToken)
    }
    return { params }
  }

  return errorResponse(
    'Missing or invalid mode parameter (expected "search", "summary", "quests", or "details")'
  )
}
