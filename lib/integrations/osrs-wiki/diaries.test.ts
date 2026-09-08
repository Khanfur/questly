import { fetchDiaryList, useDiaryList } from '@/lib/integrations/osrs-wiki/diaries'
import { WikiError } from '@/lib/types/osrs-wiki'
import { act, renderHook, waitFor } from '@testing-library/react'

function mockFetchOnce(body: unknown, ok = true, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  }) as jest.Mock
}

describe('fetchDiaryList', () => {
  afterEach(() => jest.restoreAllMocks())

  it('maps embeddedin results ending in " Diary" to WikiDiaryListItem[]', async () => {
    mockFetchOnce({
      query: {
        embeddedin: [
          { pageid: 45650, title: 'Ardougne Diary' },
          { pageid: 302128, title: 'Steam Achievements' },
        ],
      },
    })

    const diaries = await fetchDiaryList()

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('mode=diaries'),
      expect.anything()
    )
    expect(diaries).toEqual([{ pageId: 45650, title: 'Ardougne Diary' }])
  })

  it('follows pagination via eicontinue until exhausted', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          query: { embeddedin: [{ pageid: 1, title: 'Diary A Diary' }] },
          continue: { eicontinue: '500|123' },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          query: { embeddedin: [{ pageid: 2, title: 'Diary B Diary' }] },
        }),
      }) as jest.Mock

    const diaries = await fetchDiaryList()

    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('eicontinue=500%7C123'),
      expect.anything()
    )
    expect(diaries).toEqual([
      { pageId: 1, title: 'Diary A Diary' },
      { pageId: 2, title: 'Diary B Diary' },
    ])
  })

  it('returns an empty array when there are no results', async () => {
    mockFetchOnce({ query: { embeddedin: [] } })
    const diaries = await fetchDiaryList()
    expect(diaries).toEqual([])
  })

  it('throws WikiError on a failed request', async () => {
    mockFetchOnce({}, false, 500)
    await expect(fetchDiaryList()).rejects.toThrow(WikiError)
  })
})

describe('useDiaryList', () => {
  afterEach(() => jest.restoreAllMocks())

  it('fetches the diary list on mount without needing a query param', async () => {
    mockFetchOnce({
      query: { embeddedin: [{ pageid: 45650, title: 'Ardougne Diary' }] },
    })

    const { result } = renderHook(() => useDiaryList())

    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toEqual([{ pageId: 45650, title: 'Ardougne Diary' }])
    expect(result.current.error).toBeNull()
  })

  it('sets error on a failed request', async () => {
    mockFetchOnce({}, false, 500)

    const { result } = renderHook(() => useDiaryList())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeInstanceOf(WikiError)
  })

  it('refetch triggers another request', async () => {
    mockFetchOnce({ query: { embeddedin: [] } })

    const { result } = renderHook(() => useDiaryList())
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(global.fetch).toHaveBeenCalledTimes(1)

    act(() => result.current.refetch())
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2))
  })
})
