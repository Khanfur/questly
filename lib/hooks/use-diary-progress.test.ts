import { useDiaryProgress } from '@/lib/hooks/use-diary-progress'
import { act, renderHook, waitFor } from '@testing-library/react'

describe('useDiaryProgress', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('starts with an empty completion map', async () => {
    const { result } = renderHook(() => useDiaryProgress())
    await waitFor(() => expect(result.current.diaryProgressHydrated).toBe(true))
    expect(result.current.completedByTask).toEqual({})
  })

  it('toggles a task to completed and persists it to localStorage', async () => {
    const { result } = renderHook(() => useDiaryProgress())
    await waitFor(() => expect(result.current.diaryProgressHydrated).toBe(true))

    act(() => result.current.toggleDiaryTask('Ardougne::easy::0'))

    await waitFor(() =>
      expect(result.current.completedByTask).toEqual({ 'Ardougne::easy::0': true })
    )
    expect(JSON.parse(window.localStorage.getItem('questly:diary-progress') ?? '{}')).toEqual({
      'Ardougne::easy::0': true,
    })
  })

  it('toggles a completed task back to incomplete', async () => {
    const { result } = renderHook(() => useDiaryProgress())
    await waitFor(() => expect(result.current.diaryProgressHydrated).toBe(true))

    act(() => result.current.toggleDiaryTask('Ardougne::easy::0'))
    await waitFor(() =>
      expect(result.current.completedByTask).toEqual({ 'Ardougne::easy::0': true })
    )

    act(() => result.current.toggleDiaryTask('Ardougne::easy::0'))
    await waitFor(() =>
      expect(result.current.completedByTask).toEqual({ 'Ardougne::easy::0': false })
    )
  })

  it('toggles one task without clobbering another', async () => {
    const { result } = renderHook(() => useDiaryProgress())
    await waitFor(() => expect(result.current.diaryProgressHydrated).toBe(true))

    act(() => result.current.toggleDiaryTask('Ardougne::easy::0'))
    await waitFor(() =>
      expect(result.current.completedByTask).toEqual({ 'Ardougne::easy::0': true })
    )

    act(() => result.current.toggleDiaryTask('Ardougne::easy::1'))
    await waitFor(() =>
      expect(result.current.completedByTask).toEqual({
        'Ardougne::easy::0': true,
        'Ardougne::easy::1': true,
      })
    )
  })
})
