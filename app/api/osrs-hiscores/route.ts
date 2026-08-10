/**
 * API proxy for OSRS Hiscores endpoint
 * Bypasses CORS restrictions by proxying requests from the server
 */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const playerName = searchParams.get('player')

  if (!playerName) {
    return new Response(JSON.stringify({ error: 'Missing player parameter' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  try {
    const url = `https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${encodeURIComponent(
      playerName
    )}`

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      return new Response(null, { status: response.status })
    }

    const text = await response.text()
    return new Response(text, {
      status: 200,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `Failed to fetch hiscores: ${(error as Error).message}`,
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    )
  }
}
