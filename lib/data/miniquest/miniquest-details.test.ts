import { miniquestDetails } from '@/lib/data'
import { miniquestList } from '@/lib/data'

describe('miniquestDetails', () => {
  it('is a non-empty array with valid shapes', () => {
    expect(Array.isArray(miniquestDetails)).toBe(true)
    expect(miniquestDetails.length).toBeGreaterThan(0)

    for (const miniquest of miniquestDetails) {
      expect(typeof miniquest.pageId).toBe('number')
      expect(typeof miniquest.title).toBe('string')
      expect(typeof miniquest.members).toBe('boolean')
      expect(typeof miniquest.released).toBe('boolean')
      expect(miniquest.releaseDate === null || typeof miniquest.releaseDate === 'string').toBe(true)
      expect(typeof miniquest.wikiUrl).toBe('string')
      expect(miniquest.wikiUrl).toMatch(/^https:\/\/oldschool\.runescape\.wiki\/w\//)
      expect(
        miniquest.difficulty === null ||
          ['novice', 'intermediate', 'experienced', 'master', 'grandmaster'].includes(
            miniquest.difficulty
          )
      ).toBe(true)
      expect(miniquest.enemies === null || Array.isArray(miniquest.enemies)).toBe(true)
      expect(miniquest.itemsRequired === null || Array.isArray(miniquest.itemsRequired)).toBe(true)
    }
  })

  it('has no duplicate page ids', () => {
    const ids = miniquestDetails.map((q) => q.pageId)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has an entry for every miniquest in miniquestList', () => {
    const detailIds = new Set(miniquestDetails.map((q) => q.pageId))
    for (const miniquest of miniquestList) {
      expect(detailIds.has(miniquest.pageId)).toBe(true)
    }
  })

  it('includes a well-known miniquest with expected details', () => {
    const mageArenaI = miniquestDetails.find((q) => q.title === 'Mage Arena I')
    expect(mageArenaI?.members).toBe(true)
    expect(mageArenaI?.description).toBeTruthy()
    expect(mageArenaI?.wikiUrl).toBe('https://oldschool.runescape.wiki/w/Mage_Arena_I')
  })
})
