import { cn, isLocalhost } from '@/lib/utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('merges conflicting tailwind classes, keeping the last one', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('ignores falsy values', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b')
  })
})

describe('isLocalhost', () => {
  it('returns true for localhost hostnames', () => {
    expect(isLocalhost('localhost')).toBe(true)
    expect(isLocalhost('127.0.0.1')).toBe(true)
    expect(isLocalhost('::1')).toBe(true)
  })

  it('returns false for non-localhost hostnames', () => {
    expect(isLocalhost('example.com')).toBe(false)
  })

  it('falls back to window.location.hostname when no hostname is given', () => {
    // jsdom's default test URL is http://localhost/
    expect(isLocalhost()).toBe(true)
  })
})
