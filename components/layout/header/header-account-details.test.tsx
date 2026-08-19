import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { HeaderAccountDetails } from '@/components/layout/header/header-account-details'

describe('HeaderAccountDetails', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders empty by default', () => {
    render(<HeaderAccountDetails />)
    expect(screen.getByLabelText('RuneScape username')).toHaveValue('')
    expect(screen.getByRole('radio', { name: 'Member' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Normal Account' })).toBeChecked()
  })

  it('persists the username to localStorage as the user types', async () => {
    const user = userEvent.setup()
    render(<HeaderAccountDetails />)

    await user.type(screen.getByLabelText('RuneScape username'), 'Zezima')

    expect(screen.getByLabelText('RuneScape username')).toHaveValue('Zezima')
    expect(window.localStorage.getItem('questly:account-details')).toContain('Zezima')
  })

  it('persists membership and account type selections', async () => {
    const user = userEvent.setup()
    render(<HeaderAccountDetails />)

    await user.click(screen.getByRole('radio', { name: 'Free-to-play' }))
    await user.click(screen.getByRole('radio', { name: 'Ironman' }))

    expect(screen.getByRole('radio', { name: 'Free-to-play' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Ironman' })).toBeChecked()

    const stored = JSON.parse(window.localStorage.getItem('questly:account-details') ?? '{}')
    expect(stored).toEqual({ username: '', membership: 'f2p', accountType: 'ironman' })
  })

  it('restores previously saved account details on mount', () => {
    window.localStorage.setItem(
      'questly:account-details',
      JSON.stringify({ username: 'Woox', membership: 'f2p', accountType: 'ironman' })
    )

    render(<HeaderAccountDetails />)

    expect(screen.getByLabelText('RuneScape username')).toHaveValue('Woox')
    expect(screen.getByRole('radio', { name: 'Free-to-play' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Ironman' })).toBeChecked()
  })
})
