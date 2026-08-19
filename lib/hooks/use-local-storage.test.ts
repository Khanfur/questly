import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { act, renderHook } from '@testing-library/react'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('returns the default value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('reads a previously stored value on mount', () => {
    window.localStorage.setItem('test-key', JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('stored')
  })

  it('persists updates to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))

    act(() => result.current[1]('updated'))

    expect(result.current[0]).toBe('updated')
    expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify('updated'))
  })

  it('supports functional updates', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0))

    act(() => result.current[1]((previous) => previous + 1))

    expect(result.current[0]).toBe(1)
  })

  it('ignores malformed stored JSON and falls back to the default', () => {
    window.localStorage.setItem('test-key', '{not valid json')
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('syncs when a storage event fires for the same key', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'test-key', newValue: JSON.stringify('from-other-tab') })
      )
    })

    expect(result.current[0]).toBe('from-other-tab')
  })

  it('ignores storage events for other keys', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'other-key', newValue: JSON.stringify('ignored') })
      )
    })

    expect(result.current[0]).toBe('default')
  })
})
