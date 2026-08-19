import { useQuestProgress } from '@/lib/hooks/use-quest-progress'
import { act, renderHook, waitFor } from '@testing-library/react'

describe('useQuestProgress', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('starts with an empty status map', async () => {
    const { result } = renderHook(() => useQuestProgress())
    await waitFor(() => expect(result.current.hydrated).toBe(true))
    expect(result.current.statusByQuest).toEqual({})
  })

  it('persists a quest status update to localStorage', async () => {
    const { result } = renderHook(() => useQuestProgress())
    await waitFor(() => expect(result.current.hydrated).toBe(true))

    act(() => result.current.setQuestStatus("Cook's Assistant", 'completed'))

    await waitFor(() =>
      expect(result.current.statusByQuest).toEqual({ "Cook's Assistant": 'completed' })
    )
    expect(JSON.parse(window.localStorage.getItem('questly:quest-progress') ?? '{}')).toEqual({
      "Cook's Assistant": 'completed',
    })
  })

  it('updates one quest without clobbering another', async () => {
    const { result } = renderHook(() => useQuestProgress())
    await waitFor(() => expect(result.current.hydrated).toBe(true))

    act(() => result.current.setQuestStatus("Cook's Assistant", 'completed'))
    await waitFor(() =>
      expect(result.current.statusByQuest).toEqual({ "Cook's Assistant": 'completed' })
    )

    act(() => result.current.setQuestStatus('Dragon Slayer II', 'in-progress'))
    await waitFor(() =>
      expect(result.current.statusByQuest).toEqual({
        "Cook's Assistant": 'completed',
        'Dragon Slayer II': 'in-progress',
      })
    )
  })
})
