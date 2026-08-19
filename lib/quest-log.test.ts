import { buildQuestLog } from '@/lib/quest-log'
import type { WikiQuestDetails } from '@/lib/types/osrs-wiki'

function detail(overrides: Partial<WikiQuestDetails>): WikiQuestDetails {
  return {
    pageId: 1,
    title: 'Some Quest',
    difficulty: 'novice',
    length: null,
    members: false,
    series: null,
    questPoints: 1,
    start: null,
    description: null,
    requirements: null,
    enemies: null,
    itemsRequired: null,
    wikiUrl: 'https://oldschool.runescape.wiki/w/Some_Quest',
    ...overrides,
  }
}

describe('buildQuestLog', () => {
  it('returns all five difficulty tiers in order, even when some are empty', () => {
    const questLog = buildQuestLog([], {})
    expect(questLog.map((tier) => tier.difficulty)).toEqual([
      'novice',
      'intermediate',
      'experienced',
      'master',
      'grandmaster',
    ])
    expect(questLog.every((tier) => tier.quests.length === 0)).toBe(true)
  })

  it('groups quests into their matching difficulty tier', () => {
    const questLog = buildQuestLog(
      [
        detail({ title: "Cook's Assistant", difficulty: 'novice' }),
        detail({ pageId: 2, title: 'Dragon Slayer II', difficulty: 'grandmaster' }),
      ],
      {}
    )

    const novice = questLog.find((tier) => tier.difficulty === 'novice')
    const grandmaster = questLog.find((tier) => tier.difficulty === 'grandmaster')
    expect(novice?.quests.map((q) => q.name)).toEqual(["Cook's Assistant"])
    expect(grandmaster?.quests.map((q) => q.name)).toEqual(['Dragon Slayer II'])
  })

  it('defaults quests with no locally-tracked status to not-started', () => {
    const questLog = buildQuestLog([detail({ title: "Cook's Assistant" })], {})
    const quest = questLog.flatMap((t) => t.quests).find((q) => q.name === "Cook's Assistant")
    expect(quest?.status).toBe('not-started')
  })

  it('applies the locally-tracked status for a quest by title', () => {
    const questLog = buildQuestLog([detail({ title: "Cook's Assistant" })], {
      "Cook's Assistant": 'completed',
    })
    const quest = questLog.flatMap((t) => t.quests).find((q) => q.name === "Cook's Assistant")
    expect(quest?.status).toBe('completed')
  })

  it('falls back to "None" for requirements when the field is null or blank', () => {
    const questLog = buildQuestLog([detail({ title: "Cook's Assistant", requirements: null })], {})
    const quest = questLog.flatMap((t) => t.quests).find((q) => q.name === "Cook's Assistant")
    expect(quest?.requires).toBe('None')
  })

  it('defaults questPoints to 0 when null', () => {
    const questLog = buildQuestLog([detail({ title: "Cook's Assistant", questPoints: null })], {})
    const quest = questLog.flatMap((t) => t.quests).find((q) => q.name === "Cook's Assistant")
    expect(quest?.questPoints).toBe(0)
  })

  it('excludes wiki sub-pages (titles containing "/") that are not standalone quests', () => {
    const questLog = buildQuestLog(
      [
        detail({ title: 'Recipe for Disaster/Freeing Pirate Pete', difficulty: null }),
        detail({ title: 'Recipe for Disaster/Full guide', difficulty: null }),
      ],
      {}
    )
    expect(questLog.flatMap((t) => t.quests)).toHaveLength(0)
  })

  it('falls back to master difficulty for Recipe for Disaster, which the wiki rates "Special"', () => {
    const questLog = buildQuestLog(
      [detail({ title: 'Recipe for Disaster', difficulty: null, questPoints: 10 })],
      {}
    )
    const master = questLog.find((tier) => tier.difficulty === 'master')
    expect(master?.quests.map((q) => q.name)).toEqual(['Recipe for Disaster'])
  })

  it('excludes a quest whose difficulty cannot be resolved at all', () => {
    const questLog = buildQuestLog([detail({ title: 'Some Unrated Quest', difficulty: null })], {})
    expect(questLog.flatMap((t) => t.quests)).toHaveLength(0)
  })
})
