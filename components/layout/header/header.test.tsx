import { render, screen } from '@testing-library/react'

import { Header } from '@/components/layout/header/header'
import { SettingsDrawerProvider } from '@/components/layout/header/settings-drawer-context'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

function renderHeader() {
  return render(
    <SettingsDrawerProvider>
      <Header />
    </SettingsDrawerProvider>
  )
}

describe('Header', () => {
  it('renders the Questly brand link', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /questly/i })).toHaveAttribute('href', '/')
  })

  it('renders the desktop nav links', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'Stats' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Quests' })).toHaveAttribute('href', '/quests')
    expect(screen.getByRole('link', { name: 'Ask the Sage' })).toHaveAttribute(
      'href',
      '/ask-the-sage'
    )
  })

  it('marks the active nav link based on the current pathname', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'Stats' })).toHaveClass('bg-muted')
    expect(screen.getByRole('link', { name: 'Quests' })).not.toHaveClass('bg-muted')
  })

  it('renders a settings button', () => {
    renderHeader()
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument()
  })
})
