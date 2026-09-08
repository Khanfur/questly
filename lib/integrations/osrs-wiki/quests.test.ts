import { fetchQuestList, useQuestList } from '@/lib/integrations/osrs-wiki/quests'
import { WikiError } from '@/lib/types/osrs-wiki'
import { act, renderHook, waitFor } from '@testing-library/react'

function mockFetchOnce(body: unknown, ok = true, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  }) as jest.Mock
}

describe('fetchQuestList', () => {
  afterEach(() => jest.restoreAllMocks())

  it('maps embeddedin results to WikiQuestListItem[]', async () => {
    mockFetchOnce({
      query: {
        embeddedin: [
          { pageid: 2088, title: "Cook's Assistant" },
          { pageid: 2174, title: 'Dragon Slayer I' },
        ],
      },
    })

    const quests = await fetchQuestList()

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('mode=quests'),
      expect.anything()
    )
    expect(quests).toEqual([
      { pageId: 2088, title: "Cook's Assistant" },
      { pageId: 2174, title: 'Dragon Slayer I' },
    ])
  })

  it('follows pagination via eicontinue until exhausted', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          query: { embeddedin: [{ pageid: 1, title: 'Quest A' }] },
          continue: { eicontinue: '500|123' },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          query: { embeddedin: [{ pageid: 2, title: 'Quest B' }] },
        }),
      }) as jest.Mock

    const quests = await fetchQuestList()

    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('eicontinue=500%7C123'),
      expect.anything()
    )
    expect(quests).toEqual([
      { pageId: 1, title: 'Quest A' },
      { pageId: 2, title: 'Quest B' },
    ])
  })

  it('returns an empty array when there are no results', async () => {
    mockFetchOnce({ query: { embeddedin: [] } })
    const quests = await fetchQuestList()
    expect(quests).toEqual([])
  })

  it('throws WikiError on a failed request', async () => {
    mockFetchOnce({}, false, 500)
    await expect(fetchQuestList()).rejects.toThrow(WikiError)
  })
})

describe('useQuestList', () => {
  afterEach(() => jest.restoreAllMocks())

  it('fetches the quest list on mount without needing a query param', async () => {
    mockFetchOnce({
      query: { embeddedin: [{ pageid: 2088, title: "Cook's Assistant" }] },
    })

    const { result } = renderHook(() => useQuestList())

    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toEqual([{ pageId: 2088, title: "Cook's Assistant" }])
    expect(result.current.error).toBeNull()
  })

  it('sets error on a failed request', async () => {
    mockFetchOnce({}, false, 500)

    const { result } = renderHook(() => useQuestList())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeInstanceOf(WikiError)
  })

  it('refetch triggers another request', async () => {
    mockFetchOnce({ query: { embeddedin: [] } })

    const { result } = renderHook(() => useQuestList())
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(global.fetch).toHaveBeenCalledTimes(1)

    act(() => result.current.refetch())
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2))
  })
})
