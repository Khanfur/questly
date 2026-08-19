import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { HeaderAccountDetails } from '@/components/layout/header/header-account-details'
import { SettingsDrawerProvider } from '@/components/layout/header/settings-drawer-context'

const renderWithContext = (component: React.ReactNode) => {
  return render(<SettingsDrawerProvider>{component}</SettingsDrawerProvider>)
}

describe('HeaderAccountDetails', () => {
  beforeEach(() => {
    window.localStorage.clear()
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
    expect(stored).toEqual({ username: '', membership: 'f2p', accountType: 'ironman' })
  })

  it('restores previously saved account details on mount', () => {
    window.localStorage.setItem(
      'questly:account-details',
      JSON.stringify({ username: 'Woox', membership: 'f2p', accountType: 'ironman' })
    )

    renderWithContext(<HeaderAccountDetails />)

    expect(screen.getByLabelText('RuneScape username')).toHaveValue('Woox')
    expect(screen.getByRole('radio', { name: 'Free to play' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Ironman' })).toBeChecked()
  })

  it('allows selecting hardcore ironman as an account type', async () => {
    const user = userEvent.setup()
    renderWithContext(<HeaderAccountDetails />)

    await user.click(screen.getByRole('radio', { name: 'Hardcore Ironman' }))

    expect(screen.getByRole('radio', { name: 'Hardcore Ironman' })).toBeChecked()

    const stored = JSON.parse(window.localStorage.getItem('questly:account-details') ?? '{}')
    expect(stored).toEqual({ username: '', membership: 'member', accountType: 'hc_ironman' })
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
})
