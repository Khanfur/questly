/**
 * @jest-environment node
 */
import { fetchDiaryList, toModuleSource } from '../scripts/fetch-diary-list.mjs'

function mockFetchOnce(body, ok = true, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  })
}

describe('fetchDiaryList', () => {
  afterEach(() => jest.restoreAllMocks())

  it('maps embeddedin results ending in " Diary" to {pageId, title}', async () => {
    mockFetchOnce({
      query: {
        embeddedin: [
          { pageid: 45650, title: 'Ardougne Diary' },
          { pageid: 302128, title: 'Steam Achievements' },
        ],
      },
    })

    const diaries = await fetchDiaryList()

    expect(diaries).toEqual([{ pageId: 45650, title: 'Ardougne Diary' }])
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('oldschool.runescape.wiki/api.php'),
      expect.objectContaining({ headers: { 'User-Agent': expect.stringContaining('Questly') } })
    )
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
      })

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

  it('throws when the wiki request fails', async () => {
    mockFetchOnce({}, false, 500)
    await expect(fetchDiaryList()).rejects.toThrow('status 500')
  })
})

describe('toModuleSource', () => {
  it('renders a generated TypeScript module with a typed array of diaries', () => {
    const diaries = [
      { pageId: 14158, title: 'Karamja Diary' },
      { pageId: 45650, title: 'Ardougne Diary' },
    ]
    const source = toModuleSource(diaries, new Date('2026-01-01T00:00:00.000Z'))

    expect(source).toContain("import type { WikiDiaryListItem } from '@/lib/types/osrs-wiki'")
    expect(source).toContain('export const diaryList: WikiDiaryListItem[] = [')
    expect(source).toContain(`{ pageId: 14158, title: "Karamja Diary" },`)
    expect(source).toContain(`{ pageId: 45650, title: "Ardougne Diary" },`)
    expect(source).toContain('Count: 2 diaries')
    expect(source).toContain('Last generated: 2026-01-01T00:00:00.000Z')
  })

  it('renders an empty array when there are no diaries', () => {
    const source = toModuleSource([], new Date('2026-01-01T00:00:00.000Z'))
    expect(source).toContain('export const diaryList: WikiDiaryListItem[] = [\n\n]')
  })
})
