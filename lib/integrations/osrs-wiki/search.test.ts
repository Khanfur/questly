import { searchWiki, useWikiSearch } from '@/lib/integrations/osrs-wiki/search'
import { WikiError } from '@/lib/types/osrs-wiki/osrs-wiki'
import { act, renderHook, waitFor } from '@testing-library/react'

function mockFetchOnce(body: unknown, ok = true, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  }) as jest.Mock
}

describe('searchWiki', () => {
  afterEach(() => jest.restoreAllMocks())

  it('maps raw search results to WikiSearchResult[]', async () => {
    mockFetchOnce({
      query: {
        search: [
          {
            pageid: 1,
            title: 'Dragon Slayer II',
            snippet: 'A <span class="searchmatch">quest</span>.',
          },
        ],
      },
    })

    const results = await searchWiki('Dragon Slayer II')

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('mode=search&q=Dragon%20Slayer%20II'),
      expect.anything()
    )
    expect(results).toEqual([
      {
        pageId: 1,
        title: 'Dragon Slayer II',
        snippet: 'A <span class="searchmatch">quest</span>.',
      },
    ])
  })

  it('returns an empty array when no results are found', async () => {
    mockFetchOnce({ query: { search: [] } })
    const results = await searchWiki('asdfghjkl')
    expect(results).toEqual([])
  })

  it('throws WikiError on a failed request', async () => {
    mockFetchOnce({}, false, 500)
    await expect(searchWiki('Dragon Slayer II')).rejects.toThrow(WikiError)
  })
})

describe('useWikiSearch', () => {
  afterEach(() => jest.restoreAllMocks())

  it('sets data after a successful search', async () => {
    mockFetchOnce({
      query: { search: [{ pageid: 1, title: 'Cabbage', snippet: 'A cabbage.' }] },
    })

    const { result } = renderHook(() => useWikiSearch('Cabbage'))

    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toEqual([{ pageId: 1, title: 'Cabbage', snippet: 'A cabbage.' }])
    expect(result.current.error).toBeNull()
  })

  it('does not fetch when query is null', () => {
    global.fetch = jest.fn()
    const { result } = renderHook(() => useWikiSearch(null))
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeNull()
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('refetch triggers another request', async () => {
    mockFetchOnce({
      query: { search: [{ pageid: 1, title: 'Cabbage', snippet: 'A cabbage.' }] },
    })

    const { result } = renderHook(() => useWikiSearch('Cabbage'))
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(global.fetch).toHaveBeenCalledTimes(1)

    act(() => result.current.refetch())
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2))
  })
})
