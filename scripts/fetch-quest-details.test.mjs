/**
 * @jest-environment node
 */
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import {
  fetchQuestDetails,
  readExistingQuestDetails,
  toModuleSource,
  upsertQuestDetails,
} from './fetch-quest-details.mjs'

function mockFetchOnce(body, ok = true, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  })
}

describe('fetchQuestDetails', () => {
  afterEach(() => jest.restoreAllMocks())

  it('parses a quest page fetched via action=parse', async () => {
    mockFetchOnce({
      parse: {
        title: "Cook's Assistant",
        pageid: 2088,
        wikitext:
          '{{Infobox Quest\n|members = No\n}}\n==Details==\n{{Quest details\n|difficulty = Novice\n|length = Very Short\n}}\n',
      },
    })

    const details = await fetchQuestDetails("Cook's Assistant")

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('action=parse'),
      expect.objectContaining({ headers: { 'User-Agent': expect.stringContaining('Questly') } })
    )
    expect(details.difficulty).toBe('novice')
    expect(details.length).toBe('Very Short')
    expect(details.pageId).toBe(2088)
  })

  it('throws when the page is missing', async () => {
    mockFetchOnce({ parse: undefined })
    await expect(fetchQuestDetails('Nonexistent Quest')).rejects.toThrow('not found')
  })

  it('throws on a failed request', async () => {
    mockFetchOnce({}, false, 500)
    await expect(fetchQuestDetails("Cook's Assistant")).rejects.toThrow('status 500')
  })
})

describe('upsertQuestDetails', () => {
  it('replaces an existing entry with the same pageId', () => {
    const existing = [
      { pageId: 1, title: 'Quest A', difficulty: 'novice' },
      { pageId: 2, title: 'Quest B', difficulty: 'master' },
    ]
    const updated = upsertQuestDetails(existing, {
      pageId: 1,
      title: 'Quest A',
      difficulty: 'grandmaster',
    })

    expect(updated).toHaveLength(2)
    expect(updated.find((q) => q.pageId === 1)?.difficulty).toBe('grandmaster')
  })

  it('appends a new entry and keeps the array sorted by pageId', () => {
    const existing = [{ pageId: 5, title: 'Quest E' }]
    const updated = upsertQuestDetails(existing, { pageId: 2, title: 'Quest B' })

    expect(updated.map((q) => q.pageId)).toEqual([2, 5])
  })
})

describe('toModuleSource / readExistingQuestDetails round-trip', () => {
  let dir

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'quest-details-'))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('round-trips through a generated file, including unquoted-key formatting', () => {
    const quests = [
      { pageId: 2088, title: "Cook's Assistant", difficulty: 'novice', members: false },
      { pageId: 104940, title: 'Dragon Slayer II', difficulty: 'grandmaster', members: true },
    ]

    // Emulate Prettier's `quoteProps: "as-needed"`, which strips quotes from
    // valid-identifier object keys in the real generated file.
    const source = toModuleSource(quests, new Date('2026-01-01T00:00:00.000Z')).replace(
      /"(pageId|title|difficulty|members)":/g,
      '$1:'
    )

    const path = join(dir, 'quest-details.ts')
    writeFileSync(path, source)

    const roundTripped = readExistingQuestDetails(path)
    expect(roundTripped).toEqual(quests)
  })

  it('returns an empty array when the file does not exist yet', () => {
    expect(readExistingQuestDetails(join(dir, 'missing.ts'))).toEqual([])
  })
})
