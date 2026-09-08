import { useEffect } from 'react'

import { __resetHiscoresAutoFetchGuardForTests } from '@/lib/hooks/use-account-details'
import { AccountType, Membership } from '@/lib/types/account/account'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { HeaderAccountDetails } from '@/components/layout/header/header-account-details'
import {
  SettingsDrawerProvider,
  useSettingsDrawer,
} from '@/components/layout/header/settings-drawer-context'

const renderWithContext = (component: React.ReactNode) => {
  return render(<SettingsDrawerProvider>{component}</SettingsDrawerProvider>)
}

// A saved username also triggers `useAccountDetails`'s automatic hiscores
// refresh on mount, so any test that pre-seeds one needs a mocked `fetch`
// to settle cleanly (otherwise the resulting error/loading state updates
// land after the test finishes and trip React's "not wrapped in act"
// warning).
function mockFetchOnce(body = '') {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    text: async () => body,
  }) as jest.Mock
}

// Opens the drawer on mount (mimicking a user clicking the settings cog),
// then renders `HeaderAccountDetails` alongside a visible open/closed
// indicator so tests can assert the drawer doesn't get closed out from under
// the user.
function OpenedDrawerHarness() {
  const { open, setOpen } = useSettingsDrawer()

  useEffect(() => {
    setOpen(true)
  }, [setOpen])

  return (
    <>
      <span data-testid="drawer-state">{open ? 'open' : 'closed'}</span>
      <HeaderAccountDetails />
    </>
  )
}

describe('HeaderAccountDetails', () => {
  beforeEach(() => {
    window.localStorage.clear()
    __resetHiscoresAutoFetchGuardForTests()
  })

  it('renders empty by default', () => {
    renderWithContext(<HeaderAccountDetails />)
    expect(screen.getByLabelText('RuneScape username')).toHaveValue('')
    expect(screen.getByRole('radio', { name: 'Member' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Main' })).toBeChecked()
  })

  it('persists the username to localStorage as the user types', async () => {
    const user = userEvent.setup()
    renderWithContext(<HeaderAccountDetails />)

    await user.type(screen.getByLabelText('RuneScape username'), 'Zezima')

    expect(screen.getByLabelText('RuneScape username')).toHaveValue('Zezima')
    expect(window.localStorage.getItem('questly:account-details')).toContain('Zezima')
  })

  it('persists membership and account type selections', async () => {
    const user = userEvent.setup()
    renderWithContext(<HeaderAccountDetails />)

    await user.click(screen.getByRole('radio', { name: 'Free to play' }))
    await user.click(screen.getByRole('radio', { name: 'Ironman' }))

    expect(screen.getByRole('radio', { name: 'Free to play' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Ironman' })).toBeChecked()

    const stored = JSON.parse(window.localStorage.getItem('questly:account-details') ?? '{}')
    expect(stored).toEqual({
      username: '',
      membership: Membership.f2p,
      accountType: AccountType.ironman,
    })
  })

  it('restores previously saved account details on mount', async () => {
    mockFetchOnce()
    window.localStorage.setItem(
      'questly:account-details',
      JSON.stringify({
        username: 'Woox',
        membership: Membership.f2p,
        accountType: AccountType.ironman,
      })
    )

    renderWithContext(<HeaderAccountDetails />)

    expect(screen.getByLabelText('RuneScape username')).toHaveValue('Woox')
    expect(screen.getByRole('radio', { name: 'Free to play' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Ironman' })).toBeChecked()

    // Let the automatic hiscores refresh (triggered by the saved username)
    // settle before the test ends.
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())
  })

  it('allows selecting hardcore ironman as an account type', async () => {
    const user = userEvent.setup()
    renderWithContext(<HeaderAccountDetails />)

    await user.click(screen.getByRole('radio', { name: 'Hardcore Ironman' }))

    expect(screen.getByRole('radio', { name: 'Hardcore Ironman' })).toBeChecked()

    const stored = JSON.parse(window.localStorage.getItem('questly:account-details') ?? '{}')
    expect(stored).toEqual({
      username: '',
      membership: Membership.member,
      accountType: AccountType.hcIronman,
    })
  })

  it('renders a fetch button next to the username input', () => {
    renderWithContext(<HeaderAccountDetails />)
    expect(screen.getByRole('button', { name: 'Fetch' })).toBeInTheDocument()
  })

  it('shows error when fetch button is clicked with no username', async () => {
    const user = userEvent.setup()
    renderWithContext(<HeaderAccountDetails />)

    await user.click(screen.getByRole('button', { name: 'Fetch' }))

    expect(screen.getByText('Please enter a username first')).toBeInTheDocument()
  })

  it('does not auto-close the drawer on mount for a returning user with a saved username', async () => {
    mockFetchOnce()
    window.localStorage.setItem(
      'questly:account-details',
      JSON.stringify({
        username: 'Woox',
        membership: Membership.member,
        accountType: AccountType.main,
      })
    )

    render(
      <SettingsDrawerProvider>
        <OpenedDrawerHarness />
      </SettingsDrawerProvider>
    )

    await waitFor(() => expect(screen.getByLabelText('RuneScape username')).toHaveValue('Woox'))

    expect(screen.getByTestId('drawer-state')).toHaveTextContent('open')

    // Let the automatic hiscores refresh settle before the test ends, so
    // its state updates don't leak into the next test.
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())
  })
})
