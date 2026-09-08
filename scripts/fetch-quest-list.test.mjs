/**
 * @jest-environment node
 */
import { fetchQuestList, toModuleSource } from '../scripts/fetch-quest-list.mjs'

function mockFetchOnce(body, ok = true, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  })
}

describe('fetchQuestList', () => {
  afterEach(() => jest.restoreAllMocks())

  it('maps embeddedin results to {pageId, title} and sends the required User-Agent', async () => {
    mockFetchOnce({
      query: { embeddedin: [{ pageid: 2088, title: "Cook's Assistant" }] },
    })

    const quests = await fetchQuestList()

    expect(quests).toEqual([{ pageId: 2088, title: "Cook's Assistant" }])
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
      })

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

  it('throws when the wiki request fails', async () => {
    mockFetchOnce({}, false, 500)
    await expect(fetchQuestList()).rejects.toThrow('status 500')
  })
})

describe('toModuleSource', () => {
  it('renders a generated TypeScript module with a typed array of quests', () => {
    const quests = [
      { pageId: 2088, title: "Cook's Assistant" },
      { pageId: 2174, title: 'Dragon Slayer I' },
    ]
    const source = toModuleSource(quests, new Date('2026-01-01T00:00:00.000Z'))

    expect(source).toContain("import type { WikiQuestListItem } from '@/lib/types/osrs-wiki'")
    expect(source).toContain('export const questList: WikiQuestListItem[] = [')
    expect(source).toContain(`{ pageId: 2088, title: "Cook's Assistant" },`)
    expect(source).toContain(`{ pageId: 2174, title: "Dragon Slayer I" },`)
    expect(source).toContain('Count: 2 quests')
    expect(source).toContain('Last generated: 2026-01-01T00:00:00.000Z')
  })

  it('renders an empty array when there are no quests', () => {
    const source = toModuleSource([], new Date('2026-01-01T00:00:00.000Z'))
    expect(source).toContain('export const questList: WikiQuestListItem[] = [\n\n]')
  })
})
