/**
 * @jest-environment node
 */
import { GET } from '@/app/api/osrs-wiki/route'

function mockFetchOnce({
  ok = true,
  status = 200,
  json = {},
}: {
  ok?: boolean
  status?: number
  json?: unknown
}) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    json: async () => json,
  }) as jest.Mock
}

describe('GET /api/osrs-wiki', () => {
  afterEach(() => jest.restoreAllMocks())

  it('returns 400 when mode is missing or invalid', async () => {
    const request = new Request('http://localhost/api/osrs-wiki')
    const response = await GET(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.error).toContain('Missing or invalid mode parameter')
  })

  describe('mode=search', () => {
    it('returns 400 when q is missing', async () => {
      const request = new Request('http://localhost/api/osrs-wiki?mode=search')
      const response = await GET(request)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body).toEqual({ error: 'Missing q parameter' })
    })

    it('proxies the search request to the wiki API', async () => {
      const wikiResponse = { query: { search: [{ pageid: 1, title: 'Cabbage', snippet: 'A cabbage.' }] } }
      mockFetchOnce({ json: wikiResponse })

      const request = new Request('http://localhost/api/osrs-wiki?mode=search&q=cabbage')
      const response = await GET(request)

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('action=query&list=search&srsearch=cabbage'),
        expect.objectContaining({ headers: expect.objectContaining({ 'User-Agent': expect.any(String) }) })
      )
      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('application/json')
      expect(await response.json()).toEqual(wikiResponse)
    })
  })

  describe('mode=summary', () => {
    it('returns 400 when title is missing', async () => {
      const request = new Request('http://localhost/api/osrs-wiki?mode=summary')
      const response = await GET(request)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body).toEqual({ error: 'Missing title parameter' })
    })

    it('proxies the summary request to the wiki API', async () => {
      const wikiResponse = { query: { pages: [{ pageid: 42, title: 'Cabbage', extract: 'A cabbage.' }] } }
      mockFetchOnce({ json: wikiResponse })

      const request = new Request('http://localhost/api/osrs-wiki?mode=summary&title=Cabbage')
      const response = await GET(request)

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('action=query&prop=extracts'),
        expect.anything()
      )
      expect(response.status).toBe(200)
      expect(await response.json()).toEqual(wikiResponse)
    })
  })

  describe('mode=quests', () => {
    it('proxies the quest list request to the wiki API', async () => {
      const wikiResponse = {
        query: { embeddedin: [{ pageid: 2088, title: "Cook's Assistant" }] },
      }
      mockFetchOnce({ json: wikiResponse })

      const request = new Request('http://localhost/api/osrs-wiki?mode=quests')
      const response = await GET(request)

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          'action=query&list=embeddedin&eititle=Template%3AInfobox+Quest&einamespace=0&eilimit=500'
        ),
        expect.objectContaining({ headers: expect.objectContaining({ 'User-Agent': expect.any(String) }) })
      )
      expect(response.status).toBe(200)
      expect(await response.json()).toEqual(wikiResponse)
    })

    it('forwards an eicontinue token for pagination', async () => {
      mockFetchOnce({ json: { query: { embeddedin: [] } } })

      const request = new Request('http://localhost/api/osrs-wiki?mode=quests&eicontinue=500%7C123')
      await GET(request)

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('eicontinue=500%7C123'),
        expect.anything()
      )
    })
  })

  it('forwards a non-ok upstream status with no body', async () => {
    mockFetchOnce({ ok: false, status: 503 })

    const request = new Request('http://localhost/api/osrs-wiki?mode=search&q=cabbage')
    const response = await GET(request)

    expect(response.status).toBe(503)
  })

  it('returns 500 with an error message when the upstream fetch throws', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('network down')) as jest.Mock

    const request = new Request('http://localhost/api/osrs-wiki?mode=search&q=cabbage')
    const response = await GET(request)

    expect(response.status).toBe(500)
    const body = await response.json()
    expect(body.error).toContain('network down')
  })
})
