/**
 * @jest-environment node
 */
import { buildWikiParams } from '@/app/api/osrs-wiki/build-wiki-params'

describe('buildWikiParams', () => {
  it('returns an error Response when mode is missing or invalid', async () => {
    const result = buildWikiParams(null, new URLSearchParams())

    expect('error' in result).toBe(true)
    if ('error' in result) {
      expect(result.error.status).toBe(400)
      const body = await result.error.json()
      expect(body.error).toContain('Missing or invalid mode parameter')
    }
  })

  describe('mode=search', () => {
    it('returns an error when q is missing', async () => {
      const result = buildWikiParams('search', new URLSearchParams())
      expect('error' in result).toBe(true)
      if ('error' in result) {
        expect(result.error.status).toBe(400)
        expect(await result.error.json()).toEqual({ error: 'Missing q parameter' })
      }
    })

    it('builds search params', () => {
      const result = buildWikiParams('search', new URLSearchParams({ q: 'cabbage' }))
      expect('params' in result).toBe(true)
      if ('params' in result) {
        expect(result.params.get('action')).toBe('query')
        expect(result.params.get('list')).toBe('search')
        expect(result.params.get('srsearch')).toBe('cabbage')
      }
    })
  })

  describe('mode=summary', () => {
    it('returns an error when title is missing', async () => {
      const result = buildWikiParams('summary', new URLSearchParams())
      expect('error' in result).toBe(true)
      if ('error' in result) {
        expect(await result.error.json()).toEqual({ error: 'Missing title parameter' })
      }
    })

    it('builds summary params', () => {
      const result = buildWikiParams('summary', new URLSearchParams({ title: 'Cabbage' }))
      expect('params' in result).toBe(true)
      if ('params' in result) {
        expect(result.params.get('action')).toBe('query')
        expect(result.params.get('prop')).toBe('extracts')
        expect(result.params.get('titles')).toBe('Cabbage')
      }
    })
  })

  describe('mode=quests', () => {
    it('builds quest list params without eicontinue by default', () => {
      const result = buildWikiParams('quests', new URLSearchParams())
      expect('params' in result).toBe(true)
      if ('params' in result) {
        expect(result.params.get('list')).toBe('embeddedin')
        expect(result.params.get('eititle')).toBe('Template:Infobox Quest')
        expect(result.params.has('eicontinue')).toBe(false)
      }
    })

    it('forwards an eicontinue token when provided', () => {
      const result = buildWikiParams(
        'quests',
        new URLSearchParams({ eicontinue: '500|123' })
      )
      expect('params' in result).toBe(true)
      if ('params' in result) {
        expect(result.params.get('eicontinue')).toBe('500|123')
      }
    })
  })
})
