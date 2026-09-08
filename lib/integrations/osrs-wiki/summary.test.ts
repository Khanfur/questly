import { fetchWikiPageSummary, useWikiPage } from '@/lib/integrations/osrs-wiki/summary'
import { WikiError } from '@/lib/types/osrs-wiki'
import { act, renderHook, waitFor } from '@testing-library/react'

function mockFetchOnce(body: unknown, ok = true, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  }) as jest.Mock
}

describe('fetchWikiPageSummary', () => {
  afterEach(() => jest.restoreAllMocks())

  it('returns a WikiPageSummary for an existing page', async () => {
    mockFetchOnce({
      query: {
        pages: [{ pageid: 42, title: 'Dragon Slayer II', extract: 'A quest.' }],
      },
    })

    const summary = await fetchWikiPageSummary('Dragon Slayer II')

    expect(summary).toEqual({
      pageId: 42,
      title: 'Dragon Slayer II',
      extract: 'A quest.',
    })
  })

  it('throws WikiError with status 404 for a missing page', async () => {
    mockFetchOnce({
      query: { pages: [{ pageid: -1, title: 'Nonexistent Page', missing: true }] },
    })

    await expect(fetchWikiPageSummary('Nonexistent Page')).rejects.toMatchObject({
      name: 'WikiError',
      status: 404,
    })
  })

  it('throws WikiError on a failed request', async () => {
    mockFetchOnce({}, false, 500)
    await expect(fetchWikiPageSummary('Dragon Slayer II')).rejects.toThrow(WikiError)
  })
})

describe('useWikiPage', () => {
  afterEach(() => jest.restoreAllMocks())

  it('sets error when the page is missing', async () => {
    mockFetchOnce({
      query: { pages: [{ pageid: -1, title: 'Nonexistent Page', missing: true }] },
    })

    const { result } = renderHook(() => useWikiPage('Nonexistent Page'))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeInstanceOf(WikiError)
    expect(result.current.error?.status).toBe(404)
  })

  it('does not fetch when title is null', () => {
    global.fetch = jest.fn()
    const { result } = renderHook(() => useWikiPage(null))
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeNull()
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('refetch triggers another request', async () => {
    mockFetchOnce({
      query: { pages: [{ pageid: 1, title: 'Cabbage', extract: 'A cabbage.' }] },
    })

    const { result } = renderHook(() => useWikiPage('Cabbage'))
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(global.fetch).toHaveBeenCalledTimes(1)

    act(() => result.current.refetch())
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2))
  })
})
