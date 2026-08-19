import { questList } from '@/lib/data'

describe('questList', () => {
  it('is a non-empty array of {pageId, title} entries', () => {
    expect(Array.isArray(questList)).toBe(true)
    expect(questList.length).toBeGreaterThan(0)

    for (const quest of questList) {
      expect(typeof quest.pageId).toBe('number')
      expect(typeof quest.title).toBe('string')
      expect(quest.title.length).toBeGreaterThan(0)
    }
  })

  it('has no duplicate page ids', () => {
    const ids = questList.map((q) => q.pageId)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('includes a well-known quest', () => {
    expect(questList.some((q) => q.title === "Cook's Assistant")).toBe(true)
  })
})
