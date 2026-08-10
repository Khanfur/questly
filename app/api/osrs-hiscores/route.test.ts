/**
 * @jest-environment node
 */
import { GET } from '@/app/api/osrs-hiscores/route'

function mockFetchOnce({
  ok = true,
  status = 200,
  text = '',
}: {
  ok?: boolean
  status?: number
  text?: string
}) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    text: async () => text,
  }) as jest.Mock
}

describe('GET /api/osrs-hiscores', () => {
  afterEach(() => jest.restoreAllMocks())

  it('returns 400 when the player parameter is missing', async () => {
    const request = new Request('http://localhost/api/osrs-hiscores')
    const response = await GET(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body).toEqual({ error: 'Missing player parameter' })
  })

  it('proxies the hiscores request and returns the CSV text', async () => {
    mockFetchOnce({ text: '1,99,1000\n' })

    const request = new Request('http://localhost/api/osrs-hiscores?player=Zezima')
    const response = await GET(request)

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('player=Zezima'),
      expect.objectContaining({ headers: expect.objectContaining({ 'User-Agent': expect.any(String) }) })
    )
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('text/plain')
    expect(await response.text()).toBe('1,99,1000\n')
  })

  it('forwards a non-ok upstream status with no body', async () => {
    mockFetchOnce({ ok: false, status: 404 })

    const request = new Request('http://localhost/api/osrs-hiscores?player=Nonexistent')
    const response = await GET(request)

    expect(response.status).toBe(404)
  })

  it('returns 500 with an error message when the upstream fetch throws', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('network down')) as jest.Mock

    const request = new Request('http://localhost/api/osrs-hiscores?player=Zezima')
    const response = await GET(request)

    expect(response.status).toBe(500)
    const body = await response.json()
    expect(body.error).toContain('network down')
  })
})
