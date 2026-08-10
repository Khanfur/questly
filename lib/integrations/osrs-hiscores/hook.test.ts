import { useHiscores } from '@/lib/integrations/osrs-hiscores/hook'
import { HiscoresError } from '@/lib/types/osrs-hiscores'
import { ACTIVITY_NAMES } from '@/lib/fixtures/activity-names'
import { SKILL_NAMES } from '@/lib/fixtures/skill-names'
import { act, renderHook, waitFor } from '@testing-library/react'

function buildCsv({
  skillLine = (i: number) => `${i + 1},${99 - i},${1000 * (i + 1)}`,
  activityLine = (i: number) => `${i + 1},${i * 10}`,
}: {
  skillLine?: (i: number) => string
  activityLine?: (i: number) => string
} = {}) {
  const skillLines = SKILL_NAMES.map((_, i) => skillLine(i))
  const activityLines = ACTIVITY_NAMES.map((_, i) => activityLine(i))
  return [...skillLines, ...activityLines].join('\n')
}

function mockFetchOnce(body: string, ok = true, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    text: async () => body,
  }) as jest.Mock
}

describe('useHiscores', () => {
  afterEach(() => jest.restoreAllMocks())

  it('sets data after a successful fetch', async () => {
    mockFetchOnce(buildCsv())

    const { result } = renderHook(() => useHiscores('Zezima'))

    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data?.overall).toEqual({
      name: 'Overall',
      rank: 1,
      level: 99,
      xp: 1000,
    })
    expect(result.current.error).toBeNull()
  })

  it('does not fetch when playerName is null', () => {
    global.fetch = jest.fn()
    const { result } = renderHook(() => useHiscores(null))
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeNull()
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('sets error when the player is not found', async () => {
    mockFetchOnce('', false, 404)

    const { result } = renderHook(() => useHiscores('Nonexistent'))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeInstanceOf(HiscoresError)
    expect(result.current.error?.status).toBe(404)
  })

  it('refetch triggers another request', async () => {
    mockFetchOnce(buildCsv())

    const { result } = renderHook(() => useHiscores('Zezima'))
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(global.fetch).toHaveBeenCalledTimes(1)

    act(() => result.current.refetch())
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2))
  })
})
