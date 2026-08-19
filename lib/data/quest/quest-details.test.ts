import { questDetails } from '@/lib/data'
import { questList } from '@/lib/data'

describe('questDetails', () => {
  it('is a non-empty array with valid shapes', () => {
    expect(Array.isArray(questDetails)).toBe(true)
    expect(questDetails.length).toBeGreaterThan(0)

    for (const quest of questDetails) {
      expect(typeof quest.pageId).toBe('number')
      expect(typeof quest.title).toBe('string')
      expect(typeof quest.members).toBe('boolean')
      expect(typeof quest.released).toBe('boolean')
      expect(quest.releaseDate === null || typeof quest.releaseDate === 'string').toBe(true)
      expect(typeof quest.wikiUrl).toBe('string')
      expect(quest.wikiUrl).toMatch(/^https:\/\/oldschool\.runescape\.wiki\/w\//)
      expect(
        quest.difficulty === null ||
          ['novice', 'intermediate', 'experienced', 'master', 'grandmaster'].includes(
            quest.difficulty
          )
      ).toBe(true)
      expect(quest.enemies === null || Array.isArray(quest.enemies)).toBe(true)
      expect(quest.itemsRequired === null || Array.isArray(quest.itemsRequired)).toBe(true)
    }
  })

  it('has no duplicate page ids', () => {
    const ids = questDetails.map((q) => q.pageId)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has an entry for every quest in questList', () => {
    const detailIds = new Set(questDetails.map((q) => q.pageId))
    for (const quest of questList) {
      expect(detailIds.has(quest.pageId)).toBe(true)
    }
  })

  it('includes a well-known quest with expected details', () => {
    const cooksAssistant = questDetails.find((q) => q.title === "Cook's Assistant")
    expect(cooksAssistant?.difficulty).toBe('novice')
    expect(cooksAssistant?.members).toBe(false)
    expect(cooksAssistant?.description).toBeTruthy()
    expect(cooksAssistant?.wikiUrl).toBe("https://oldschool.runescape.wiki/w/Cook's_Assistant")
  })

  it('includes enemies to defeat for a combat-heavy quest', () => {
    const dragonSlayerII = questDetails.find((q) => q.title === 'Dragon Slayer II')
    expect(dragonSlayerII?.enemies).toEqual(
      expect.arrayContaining([expect.stringContaining('Vorkath')])
    )
  })

  it('includes items required for a quest with required items', () => {
    const dragonSlayerII = questDetails.find((q) => q.title === 'Dragon Slayer II')
    expect(dragonSlayerII?.itemsRequired).toEqual(
      expect.arrayContaining([expect.stringContaining('pickaxe')])
    )
  })
})
