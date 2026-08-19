import QuestsPage from '@/app/quests/page'
import { render, screen } from '@testing-library/react'

jest.mock('next/navigation', () => ({
  usePathname: () => '/quests',
}))

describe('QuestsPage', () => {
  it('renders the hero title with the total and completed quest counts', () => {
    render(<QuestsPage />)
    expect(screen.getByText('Quest Log', { selector: 'span' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /24 quests\./ })).toBeInTheDocument()
  })

  it('renders a tier group for every difficulty', () => {
    render(<QuestsPage />)
    expect(screen.getByRole('heading', { name: /Novice/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Grandmaster/ })).toBeInTheDocument()
  })

  it('renders quests from the fixture data', () => {
    render(<QuestsPage />)
    expect(screen.getAllByText('Dragon Slayer II').length).toBeGreaterThan(0)
    expect(screen.getByText("Cook's Assistant")).toBeInTheDocument()
  })
})
