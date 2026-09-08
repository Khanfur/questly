/**
 * @jest-environment node
 */
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import {
  fetchDiaryDetails,
  readExistingDiaryDetails,
  toModuleSource,
  upsertDiaryDetails,
} from './fetch-diary-details.mjs'

function mockFetchOnce(body, ok = true, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  })
}

describe('fetchDiaryDetails', () => {
  afterEach(() => jest.restoreAllMocks())

  it('parses a diary region page fetched via action=parse', async () => {
    mockFetchOnce({
      parse: {
        title: 'Ardougne Diary',
        pageid: 45650,
        wikitext:
          '{{Infobox Achievement Diary\n|members = Yes\n}}\n==Easy==\n{| data-diary-tier="Easy"\n|-\n|1. Do a thing.\n|{{NA|None}}\n|}\n',
      },
    })

    const details = await fetchDiaryDetails('Ardougne Diary')

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('action=parse'),
      expect.objectContaining({ headers: { 'User-Agent': expect.stringContaining('Questly') } })
    )
    expect(details.pageId).toBe(45650)
    expect(details.name).toBe('Ardougne')
    expect(details.members).toBe(true)
    expect(details.tiers.find((t) => t.tier === 'easy').tasks).toEqual([
      { description: 'Do a thing.', requirements: [] },
    ])
  })

  it('throws when the page is missing', async () => {
    mockFetchOnce({ parse: undefined })
    await expect(fetchDiaryDetails('Nonexistent Diary')).rejects.toThrow('not found')
  })

  it('throws on a failed request', async () => {
    mockFetchOnce({}, false, 500)
    await expect(fetchDiaryDetails('Ardougne Diary')).rejects.toThrow('status 500')
  })
})

describe('upsertDiaryDetails', () => {
  it('replaces an existing entry with the same pageId', () => {
    const existing = [
      { pageId: 1, title: 'Diary A Diary', name: 'Diary A' },
      { pageId: 2, title: 'Diary B Diary', name: 'Diary B' },
    ]
    const updated = upsertDiaryDetails(existing, {
      pageId: 1,
      title: 'Diary A Diary',
      name: 'Diary A',
      members: true,
    })

    expect(updated).toHaveLength(2)
    expect(updated.find((d) => d.pageId === 1)?.members).toBe(true)
  })

  it('appends a new entry and keeps the array sorted by pageId', () => {
    const existing = [{ pageId: 5, title: 'Diary E Diary' }]
    const updated = upsertDiaryDetails(existing, { pageId: 2, title: 'Diary B Diary' })

    expect(updated.map((d) => d.pageId)).toEqual([2, 5])
  })
})

describe('toModuleSource / readExistingDiaryDetails round-trip', () => {
  let dir

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'diary-details-'))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('round-trips through a generated file, including unquoted-key formatting', () => {
    const diaries = [
      { pageId: 14158, title: 'Karamja Diary', name: 'Karamja', members: true },
      { pageId: 45650, title: 'Ardougne Diary', name: 'Ardougne', members: true },
    ]

    // Emulate Prettier's `quoteProps: "as-needed"`, which strips quotes from
    // valid-identifier object keys in the real generated file.
    const source = toModuleSource(diaries, new Date('2026-01-01T00:00:00.000Z')).replace(
      /"(pageId|title|name|members)":/g,
      '$1:'
    )

    const path = join(dir, 'diary-details.ts')
    writeFileSync(path, source)

    const roundTripped = readExistingDiaryDetails(path)
    expect(roundTripped).toEqual(diaries)
  })

  it('returns an empty array when the file does not exist yet', () => {
    expect(readExistingDiaryDetails(join(dir, 'missing.ts'))).toEqual([])
  })
})
