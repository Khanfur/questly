import { render, screen } from '@testing-library/react'

import { Header } from '@/components/layout/header'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header', () => {
  it('renders the Questly brand link', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /questly/i })).toHaveAttribute('href', '/')
  })

  it('renders the desktop nav links', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: 'Stats' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Quests' })).toHaveAttribute('href', '/quests')
    expect(screen.getByRole('link', { name: 'Ask the Sage' })).toHaveAttribute(
      'href',
      '/ask-the-sage'
    )
  })

  it('marks the active nav link based on the current pathname', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: 'Stats' })).toHaveClass('bg-muted')
    expect(screen.getByRole('link', { name: 'Quests' })).not.toHaveClass('bg-muted')
  })

  it('renders a settings button', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument()
  })
})
