import { useAccountDetails } from '@/lib/hooks/use-account-details'
import { DEFAULT_ACCOUNT_DETAILS } from '@/lib/types/account'
import { act, renderHook } from '@testing-library/react'

describe('useAccountDetails', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('defaults to an empty username, member and main account', () => {
    const { result } = renderHook(() => useAccountDetails())
    expect(result.current.accountDetails).toEqual(DEFAULT_ACCOUNT_DETAILS)
  })

  it('updates and persists a single field', () => {
    const { result } = renderHook(() => useAccountDetails())

    act(() => result.current.updateAccountDetails({ username: 'Zezima' }))

    expect(result.current.accountDetails).toEqual({
      ...DEFAULT_ACCOUNT_DETAILS,
      username: 'Zezima',
    })
    expect(window.localStorage.getItem('questly:account-details')).toBe(
      JSON.stringify({ ...DEFAULT_ACCOUNT_DETAILS, username: 'Zezima' })
    )
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
    const { result: first } = renderHook(() => useAccountDetails())
    act(() => first.current.updateAccountDetails({ username: 'Woox' }))

    const { result: second } = renderHook(() => useAccountDetails())
    expect(second.current.accountDetails.username).toBe('Woox')
  })
})
