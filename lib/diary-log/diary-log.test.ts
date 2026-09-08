import { buildDiaryLog, diaryTaskKey } from '@/lib/diary-log/diary-log'
import type { WikiDiaryDetails } from '@/lib/types/osrs-wiki'

function detail(overrides: Partial<WikiDiaryDetails>): WikiDiaryDetails {
  return {
    pageId: 1,
    title: 'Ardougne Diary',
    name: 'Ardougne',
    members: true,
    tiers: [
      { tier: 'easy', tasks: [{ description: 'Task 1', requirements: [] }] },
      { tier: 'medium', tasks: [{ description: 'Task 2', requirements: [] }] },
      { tier: 'hard', tasks: [{ description: 'Task 3', requirements: [] }] },
      { tier: 'elite', tasks: [{ description: 'Task 4', requirements: [] }] },
    ],
    wikiUrl: 'https://oldschool.runescape.wiki/w/Ardougne_Diary',
    ...overrides,
  }
}

describe('diaryTaskKey', () => {
  it('builds a stable key from region, tier and index', () => {
    expect(diaryTaskKey('Ardougne', 'easy', 0)).toBe('Ardougne::easy::0')
  })
})

describe('buildDiaryLog', () => {
  it('sorts regions alphabetically by name', () => {
    const regions = buildDiaryLog(
      [detail({ name: 'Wilderness' }), detail({ name: 'Ardougne' })],
      {}
    )
    expect(regions.map((r) => r.name)).toEqual(['Ardougne', 'Wilderness'])
  })

  it('always returns all four tiers in order', () => {
    const [region] = buildDiaryLog([detail({})], {})
    expect(region.tiers.map((t) => t.tier)).toEqual(['easy', 'medium', 'hard', 'elite'])
  })

  it('marks a tier complete once every task is done', () => {
    const key = diaryTaskKey('Ardougne', 'easy', 0)
    const [region] = buildDiaryLog([detail({})], { [key]: true })

    const easy = region.tiers.find((t) => t.tier === 'easy')
    expect(easy).toMatchObject({ status: 'complete', completedTasks: 1, totalTasks: 1 })
  })

  it('marks a tier in-progress once at least one task is done but not all', () => {
    const details = detail({
      tiers: [
        {
          tier: 'easy',
          tasks: [
            { description: 'A', requirements: [] },
            { description: 'B', requirements: [] },
          ],
        },
        { tier: 'medium', tasks: [] },
        { tier: 'hard', tasks: [] },
        { tier: 'elite', tasks: [] },
      ],
    })
    const key = diaryTaskKey('Ardougne', 'easy', 0)
    const [region] = buildDiaryLog([details], { [key]: true })

    const easy = region.tiers.find((t) => t.tier === 'easy')
    expect(easy).toMatchObject({ status: 'in-progress', completedTasks: 1, totalTasks: 2 })
  })

  it('marks a tier not-started when it is first and nothing is done', () => {
    const [region] = buildDiaryLog([detail({})], {})
    expect(region.tiers.find((t) => t.tier === 'easy')).toMatchObject({ status: 'not-started' })
  })

  it('marks every tier not-started when nothing is done, regardless of order', () => {
    const [region] = buildDiaryLog([detail({})], {})
    expect(region.tiers.find((t) => t.tier === 'medium')).toMatchObject({ status: 'not-started' })
    expect(region.tiers.find((t) => t.tier === 'elite')).toMatchObject({ status: 'not-started' })
  })

  it('marks a later tier in-progress even if an earlier tier is incomplete', () => {
    const mediumKey = diaryTaskKey('Ardougne', 'medium', 0)
    const [region] = buildDiaryLog([detail({})], { [mediumKey]: true })
    expect(region.tiers.find((t) => t.tier === 'easy')).toMatchObject({ status: 'not-started' })
    expect(region.tiers.find((t) => t.tier === 'medium')).toMatchObject({ status: 'complete' })
  })
})
