import QuestsPage from '@/app/quests/page'
import { fireEvent, render, screen } from '@testing-library/react'

jest.mock('next/navigation', () => ({
  usePathname: () => '/quests',
}))

describe('QuestsPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the hero title with the real total quest count', () => {
    render(<QuestsPage />)
    expect(screen.getByText('Quest Log', { selector: 'span' })).toBeInTheDocument()
    // Every quest defaults to "not-started" until the player marks it, so 0 are complete.
    expect(screen.getByRole('heading', { name: /\d+ quests\./ })).toBeInTheDocument()
    expect(screen.getByText(/smug about 0\./)).toBeInTheDocument()
  })

  it('renders a tier group for every difficulty', () => {
    render(<QuestsPage />)
    expect(screen.getByRole('heading', { name: /Novice/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Grandmaster/ })).toBeInTheDocument()
  })

  it('renders quests from the real generated quest data', () => {
    render(<QuestsPage />)
    expect(screen.getAllByText('Dragon Slayer II').length).toBeGreaterThan(0)
    expect(screen.getByText("Cook's Assistant")).toBeInTheDocument()
  })

  it('filters quests by name as the user types in the search box', () => {
    render(<QuestsPage />)
    fireEvent.change(screen.getByPlaceholderText('Search quests…'), {
      target: { value: "cook's assistant" },
    })
    expect(screen.getByText("Cook's Assistant")).toBeInTheDocument()
    expect(screen.queryByText('Dragon Slayer II')).not.toBeInTheDocument()
  })

  it('filters quests by status when a filter pill is clicked, and updates as statuses change', () => {
    render(<QuestsPage />)

    // Mark Cook's Assistant in progress by clicking its status icon.
    fireEvent.click(screen.getByRole('button', { name: /Mark "Cook's Assistant" as/ }))

    fireEvent.click(screen.getByRole('button', { name: 'In progress' }))
    expect(screen.getAllByText("Cook's Assistant").length).toBeGreaterThan(0)
    expect(screen.queryByText('Dragon Slayer II')).not.toBeInTheDocument()
  })

  it('shows only members quests when the members-quests checkbox is checked', () => {
    render(<QuestsPage />)
    fireEvent.click(screen.getByRole('checkbox', { name: 'Members quests' }))
    // Cook's Assistant is F2P and should be filtered out.
    expect(screen.queryByText("Cook's Assistant")).not.toBeInTheDocument()
    // Dragon Slayer II is members-only and should still be shown.
    expect(screen.getAllByText('Dragon Slayer II').length).toBeGreaterThan(0)
  })

  it('shows an empty state when no quests match the filters', () => {
    render(<QuestsPage />)
    fireEvent.change(screen.getByPlaceholderText('Search quests…'), {
      target: { value: 'this quest does not exist' },
    })
    expect(screen.getByText(/No quests match your filters/)).toBeInTheDocument()
  })

  it('marking a quest complete updates the completed count and persists to localStorage', () => {
    render(<QuestsPage />)

    const statusButton = screen.getByRole('button', { name: /Mark "Cook's Assistant" as/ })
    fireEvent.click(statusButton) // not-started -> in-progress
    fireEvent.click(screen.getByRole('button', { name: /Mark "Cook's Assistant" as/ })) // in-progress -> completed

    expect(screen.getByText(/smug about 1\./)).toBeInTheDocument()
    expect(JSON.parse(window.localStorage.getItem('questly:quest-progress') ?? '{}')).toEqual({
      "Cook's Assistant": 'completed',
    })
  })
})
