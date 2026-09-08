import { miniquestList } from '@/lib/data'

describe('miniquestList', () => {
  it('is a non-empty array of {pageId, title} entries', () => {
    expect(Array.isArray(miniquestList)).toBe(true)
    expect(miniquestList.length).toBeGreaterThan(0)

    for (const miniquest of miniquestList) {
      expect(typeof miniquest.pageId).toBe('number')
      expect(typeof miniquest.title).toBe('string')
      expect(miniquest.title.length).toBeGreaterThan(0)
    }
  })

  it('has no duplicate page ids', () => {
    const ids = miniquestList.map((q) => q.pageId)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('includes a well-known miniquest', () => {
    expect(miniquestList.some((q) => q.title === 'Mage Arena I')).toBe(true)
  })
})
