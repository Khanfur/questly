import QuestsPage from '@/app/quests/page'
import { fireEvent, render, screen } from '@testing-library/react'

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

  it('filters quests by name as the user types in the search box', () => {
    render(<QuestsPage />)
    fireEvent.change(screen.getByPlaceholderText('Search quests…'), {
      target: { value: 'restless ghost' },
    })
    expect(screen.getByText('The Restless Ghost')).toBeInTheDocument()
    expect(screen.queryByText("Cook's Assistant")).not.toBeInTheDocument()
  })

  it('filters quests by status when a filter pill is clicked', () => {
    render(<QuestsPage />)
    fireEvent.click(screen.getByRole('button', { name: 'In progress' }))
    expect(screen.getAllByText('Dragon Slayer II').length).toBeGreaterThan(0)
    expect(screen.queryByText("Cook's Assistant")).not.toBeInTheDocument()
  })

  it('shows only members quests when the members-quests checkbox is checked', () => {
    render(<QuestsPage />)
    fireEvent.click(screen.getByRole('checkbox', { name: 'Members quests' }))
    // Cook's Assistant is F2P and should be filtered out.
    expect(screen.queryByText("Cook's Assistant")).not.toBeInTheDocument()
    // Priest in Peril is members-only and should still be shown.
    expect(screen.getByText('Priest in Peril')).toBeInTheDocument()
  })

  it('shows an empty state when no quests match the filters', () => {
    render(<QuestsPage />)
    fireEvent.change(screen.getByPlaceholderText('Search quests…'), {
      target: { value: 'this quest does not exist' },
    })
    expect(screen.getByText(/No quests match your filters/)).toBeInTheDocument()
  })
})
