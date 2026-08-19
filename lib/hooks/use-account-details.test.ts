import { useAccountDetails } from '@/lib/hooks/use-account-details'
import { DEFAULT_ACCOUNT_DETAILS } from '@/lib/types/account'
import { act, renderHook } from '@testing-library/react'

function mockFetchOnce(body = '', ok = true, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    text: async () => body,
  }) as jest.Mock
}

describe('useAccountDetails', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('defaults to an empty username, member and main account', () => {
    const { result } = renderHook(() => useAccountDetails())
    expect(result.current.accountDetails).toEqual(DEFAULT_ACCOUNT_DETAILS)
    expect(result.current.hiscores).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('updates and persists a single field without fetching', () => {
    global.fetch = jest.fn()
    const { result } = renderHook(() => useAccountDetails())

    act(() => result.current.updateAccountDetails({ username: 'Zezima' }))

    expect(result.current.accountDetails).toEqual({
      ...DEFAULT_ACCOUNT_DETAILS,
      username: 'Zezima',
    })
    expect(window.localStorage.getItem('questly:account-details')).toBe(
      JSON.stringify({ ...DEFAULT_ACCOUNT_DETAILS, username: 'Zezima' })
    )
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('preserves other fields when updating one field', () => {
    const { result } = renderHook(() => useAccountDetails())

    act(() => result.current.updateAccountDetails({ membership: 'f2p' }))
    act(() => result.current.updateAccountDetails({ accountType: 'ironman' }))

    expect(result.current.accountDetails).toEqual({
      username: '',
      membership: 'f2p',
      accountType: 'ironman',
    })
  })

  it('rehydrates persisted details on a fresh mount', () => {
    window.localStorage.setItem(
      'questly:account-details',
      JSON.stringify({ username: 'Woox', membership: 'f2p', accountType: 'ironman' })
    )

    const { result } = renderHook(() => useAccountDetails())
    expect(result.current.accountDetails.username).toBe('Woox')
  })

  it('sets error when refetchHiscores is called with empty username', async () => {
    const { result } = renderHook(() => useAccountDetails())

    await act(() => result.current.refetchHiscores())

    expect(result.current.error).toBe('Please enter a username first')
  })

  it('fetches and caches hiscores when refetchHiscores is called', async () => {
    mockFetchOnce()
    const { result } = renderHook(() => useAccountDetails())

    act(() => result.current.updateAccountDetails({ username: 'Zezima' }))

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()

    await act(() => result.current.refetchHiscores())

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/osrs-hiscores?player=Zezima'),
      expect.anything()
    )
    expect(result.current.hiscores).not.toBeNull()
    expect(window.localStorage.getItem('questly:hiscores')).toBe(
      JSON.stringify(result.current.hiscores)
    )
  })

  it('sets error when the fetch fails', async () => {
    mockFetchOnce('', false, 404)
    const { result } = renderHook(() => useAccountDetails())

    act(() => result.current.updateAccountDetails({ username: 'Nonexistent' }))
    await act(() => result.current.refetchHiscores())

    expect(result.current.error).toBeTruthy()
    expect(result.current.loading).toBe(false)
    expect(result.current.hiscores).toBeNull()
  })

  it('clears error when a new fetch is attempted', async () => {
    mockFetchOnce('', false, 404)
    const { result } = renderHook(() => useAccountDetails())

    act(() => result.current.updateAccountDetails({ username: 'Nonexistent' }))
    await act(() => result.current.refetchHiscores())

    expect(result.current.error).toBeTruthy()

    mockFetchOnce()
    act(() => result.current.updateAccountDetails({ username: 'Zezima' }))
    await act(() => result.current.refetchHiscores())

    expect(result.current.error).toBeNull()
  })
})
