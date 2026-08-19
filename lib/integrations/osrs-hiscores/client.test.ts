import { ACTIVITY_NAMES } from '@/lib/fixtures/activity/activity-names'
import { SKILL_NAMES } from '@/lib/fixtures/skill/skill-names'
import { fetchHiscores, parseHiscoresCsv } from '@/lib/integrations/osrs-hiscores/client'
import { HiscoresError } from '@/lib/types/osrs-hiscores/osrs-hiscores'

function buildCsv({
  skillLine = (i: number) => `${i + 1},${99 - i},${1000 * (i + 1)}`,
  activityLine = (i: number) => `${i + 1},${i * 10}`,
}: {
  skillLine?: (i: number) => string
  activityLine?: (i: number) => string
} = {}) {
  const skillLines = SKILL_NAMES.map((_, i) => skillLine(i))
  const activityLines = ACTIVITY_NAMES.map((_, i) => activityLine(i))
  return [...skillLines, ...activityLines].join('\n')
}

function mockFetchOnce(body: string, ok = true, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    text: async () => body,
  }) as jest.Mock
}

describe('parseHiscoresCsv', () => {
  it('parses a well-formed CSV into skills, activities, and overall', () => {
    const csv = buildCsv()
    const result = parseHiscoresCsv(csv)

    expect(result.skills).toHaveLength(SKILL_NAMES.length)
    expect(result.activities).toHaveLength(ACTIVITY_NAMES.length)

    expect(result.skills[0]).toEqual({ name: 'Overall', rank: 1, level: 99, xp: 1000 })
    expect(result.skills[1]).toEqual({ name: 'Attack', rank: 2, level: 98, xp: 2000 })
    expect(result.overall).toEqual(result.skills[0])

    expect(result.activities[0]).toEqual({ name: 'League Points', rank: 1, score: 0 })
  })

  it('defaults missing lines to -1 for level/xp/score', () => {
    // Only provide a single skill line; everything else is missing.
    const csv = '1,99,1000'
    const result = parseHiscoresCsv(csv)

    expect(result.skills[0]).toEqual({ name: 'Overall', rank: 1, level: 99, xp: 1000 })
    // Missing lines split to [''], and Number('') is 0 (not NaN), so `rank`
    // (which uses `??`) ends up 0 rather than -1 — only level/xp/score fall
    // back to -1 since they're `undefined` when the line has just one field.
    expect(result.skills[1]).toEqual({ name: 'Attack', rank: 0, level: -1, xp: -1 })
    expect(result.activities[0]).toEqual({ name: 'League Points', rank: 0, score: -1 })
  })

  it('trims blank lines and surrounding whitespace', () => {
    const csv = `\n\n${buildCsv()}\n\n`
    const result = parseHiscoresCsv(csv)
    expect(result.skills[0]).toEqual({ name: 'Overall', rank: 1, level: 99, xp: 1000 })
  })
})

describe('fetchHiscores', () => {
  afterEach(() => jest.restoreAllMocks())

  it('fetches and parses hiscores for a player', async () => {
    mockFetchOnce(buildCsv())

    const result = await fetchHiscores('Zezima')

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('player=Zezima'),
      expect.anything()
    )
    expect(result.overall).toEqual({ name: 'Overall', rank: 1, level: 99, xp: 1000 })
  })

  it('uses a custom baseUrl override when provided', async () => {
    mockFetchOnce(buildCsv())

    await fetchHiscores('Zezima', { baseUrl: '/api/osrs-hiscores' })

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/osrs-hiscores?player=Zezima'),
      expect.anything()
    )
  })

  it('throws HiscoresError with status 404 when the player is not found', async () => {
    mockFetchOnce('', false, 404)

    await expect(fetchHiscores('Nonexistent')).rejects.toMatchObject({
      name: 'HiscoresError',
      status: 404,
    })
  })

  it('throws HiscoresError for other non-ok responses', async () => {
    mockFetchOnce('', false, 500)

    await expect(fetchHiscores('Zezima')).rejects.toMatchObject({
      name: 'HiscoresError',
      status: 500,
    })
  })

  it('throws HiscoresError on a network failure', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('boom')) as jest.Mock

    await expect(fetchHiscores('Zezima')).rejects.toThrow(HiscoresError)
  })
})
