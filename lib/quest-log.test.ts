import { buildMiniquestLog, buildQuestLog } from '@/lib/quest-log'
import type { WikiMiniquestDetails, WikiQuestDetails } from '@/lib/types/osrs-wiki'

function detail(overrides: Partial<WikiQuestDetails>): WikiQuestDetails {
  return {
    pageId: 1,
    title: 'Some Quest',
    difficulty: 'novice',
    length: null,
    members: false,
    series: null,
    questPoints: 1,
    releaseDate: null,
    released: true,
    start: null,
    description: null,
    requirements: null,
    enemies: null,
    itemsRequired: null,
    wikiUrl: 'https://oldschool.runescape.wiki/w/Some_Quest',
    ...overrides,
  }
}

function miniquestDetail(overrides: Partial<WikiMiniquestDetails>): WikiMiniquestDetails {
  return {
    pageId: 1,
    title: 'Some Miniquest',
    difficulty: null,
    length: null,
    members: false,
    series: null,
    releaseDate: null,
    released: true,
    start: null,
    description: null,
    requirements: null,
    enemies: null,
    itemsRequired: null,
    wikiUrl: 'https://oldschool.runescape.wiki/w/Some_Miniquest',
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

  it('excludes quests that have not been released yet, and their quest points', () => {
    const questLog = buildQuestLog(
      [
        detail({ title: "Cook's Assistant", released: true }),
        detail({ pageId: 2, title: 'An Upcoming Quest', released: false, questPoints: 5 }),
      ],
      {}
    )
    const quests = questLog.flatMap((t) => t.quests)
    expect(quests.map((q) => q.name)).toEqual(["Cook's Assistant"])
    expect(quests.reduce((sum, q) => sum + q.questPoints, 0)).toBe(1)
  })

  it('copies the wiki detail fields (start, description, series, length, enemies, itemsRequired, releaseDate, wikiUrl) onto the quest', () => {
    const questLog = buildQuestLog(
      [
        detail({
          title: "Cook's Assistant",
          start: 'Talk to the Cook in the kitchen of Lumbridge Castle.',
          description: 'The Cook needs help gathering ingredients.',
          series: 'Recipe for Disaster',
          length: 'Very short',
          enemies: ['Cook'],
          itemsRequired: ['Bucket of milk', 'Egg', 'Pot of flour'],
          releaseDate: '4 January 2001',
          wikiUrl: "https://oldschool.runescape.wiki/w/Cook's_Assistant",
        }),
      ],
      {}
    )
    const quest = questLog.flatMap((t) => t.quests).find((q) => q.name === "Cook's Assistant")

    expect(quest?.start).toBe('Talk to the Cook in the kitchen of Lumbridge Castle.')
    expect(quest?.description).toBe('The Cook needs help gathering ingredients.')
    expect(quest?.series).toBe('Recipe for Disaster')
    expect(quest?.length).toBe('Very short')
    expect(quest?.enemies).toEqual(['Cook'])
    expect(quest?.itemsRequired).toEqual(['Bucket of milk', 'Egg', 'Pot of flour'])
    expect(quest?.releaseDate).toBe('4 January 2001')
    expect(quest?.wikiUrl).toBe("https://oldschool.runescape.wiki/w/Cook's_Assistant")
  })
})

describe('buildMiniquestLog', () => {
  it('returns a flat list, not grouped into difficulty tiers', () => {
    const miniquests = buildMiniquestLog(
      [
        miniquestDetail({ title: 'Mage Arena I' }),
        miniquestDetail({ pageId: 2, title: 'Mage Arena II' }),
      ],
      {}
    )
    expect(miniquests.map((m) => m.name)).toEqual(['Mage Arena I', 'Mage Arena II'])
  })

  it('defaults miniquests with no locally-tracked status to not-started', () => {
    const miniquests = buildMiniquestLog([miniquestDetail({ title: 'Mage Arena I' })], {})
    expect(miniquests[0].status).toBe('not-started')
  })

  it('applies the locally-tracked status for a miniquest by title', () => {
    const miniquests = buildMiniquestLog([miniquestDetail({ title: 'Mage Arena I' })], {
      'Mage Arena I': 'completed',
    })
    expect(miniquests[0].status).toBe('completed')
  })

  it('falls back to "None" for requirements when the field is null or blank', () => {
    const miniquests = buildMiniquestLog(
      [miniquestDetail({ title: 'Mage Arena I', requirements: null })],
      {}
    )
    expect(miniquests[0].requires).toBe('None')
  })

  it('has no questPoints field on the resulting miniquest', () => {
    const miniquests = buildMiniquestLog([miniquestDetail({ title: 'Mage Arena I' })], {})
    expect(miniquests[0]).not.toHaveProperty('questPoints')
  })

  it('excludes wiki sub-pages (titles containing "/")', () => {
    const miniquests = buildMiniquestLog(
      [miniquestDetail({ title: 'Barbarian Training/Guide' })],
      {}
    )
    expect(miniquests).toHaveLength(0)
  })

  it('excludes miniquests that have not been released yet', () => {
    const miniquests = buildMiniquestLog(
      [
        miniquestDetail({ title: 'Mage Arena I', released: true }),
        miniquestDetail({ pageId: 2, title: 'An Upcoming Miniquest', released: false }),
      ],
      {}
    )
    expect(miniquests.map((m) => m.name)).toEqual(['Mage Arena I'])
  })

  it('copies the wiki detail fields onto the miniquest', () => {
    const miniquests = buildMiniquestLog(
      [
        miniquestDetail({
          title: 'Mage Arena I',
          difficulty: 'experienced',
          start: 'Speak to Kolodion at the Mage Arena.',
          description: 'Prove your magical might.',
          series: null,
          length: 'Short',
          enemies: ['Kolodion (level 112)'],
          itemsRequired: ['Runes'],
          releaseDate: '22 September 2003',
          wikiUrl: 'https://oldschool.runescape.wiki/w/Mage_Arena_I',
        }),
      ],
      {}
    )
    const miniquest = miniquests[0]

    expect(miniquest.difficulty).toBe('experienced')
    expect(miniquest.start).toBe('Speak to Kolodion at the Mage Arena.')
    expect(miniquest.description).toBe('Prove your magical might.')
    expect(miniquest.length).toBe('Short')
    expect(miniquest.enemies).toEqual(['Kolodion (level 112)'])
    expect(miniquest.itemsRequired).toEqual(['Runes'])
    expect(miniquest.releaseDate).toBe('22 September 2003')
    expect(miniquest.wikiUrl).toBe('https://oldschool.runescape.wiki/w/Mage_Arena_I')
  })
})
