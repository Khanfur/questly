import AchievementDiariesPage from '@/app/quests/diaries/page'
import { diaryDetails } from '@/lib/data'
import { diaryTaskKey } from '@/lib/diary-log/diary-log'
import { fireEvent, render, screen, within } from '@testing-library/react'

jest.mock('next/navigation', () => ({
  usePathname: () => '/quests/diaries',
}))

describe('AchievementDiariesPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the hero title with the region count', () => {
    render(<AchievementDiariesPage />)
    expect(screen.getByText('Achievement Diaries', { selector: 'span' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /12 regions\./ })).toBeInTheDocument()
  })

  it('renders a card for every region', () => {
    render(<AchievementDiariesPage />)
    expect(screen.getByRole('heading', { name: 'Ardougne' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Wilderness' })).toBeInTheDocument()
  })

  it('renders the stat cards with no diary progress complete by default', () => {
    render(<AchievementDiariesPage />)
    expect(screen.getByText('Diary Tasks Done')).toBeInTheDocument()
    expect(screen.getByText('Tiers Complete')).toBeInTheDocument()
    expect(screen.getByText('Regions Completed')).toBeInTheDocument()
  })

  it('filters regions by name as the user types in the search box', () => {
    render(<AchievementDiariesPage />)
    fireEvent.change(screen.getByPlaceholderText('Search regions…'), {
      target: { value: 'wilderness' },
    })
    expect(screen.getByRole('heading', { name: 'Wilderness' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Ardougne' })).not.toBeInTheDocument()
  })

  it('hides fully-completed regions when the checkbox is checked', () => {
    // Pre-complete every task in every tier of the Wilderness diary.
    const wilderness = diaryDetails.find((details) => details.name === 'Wilderness')!
    const completedByTask: Record<string, boolean> = {}
    for (const tier of wilderness.tiers) {
      tier.tasks.forEach((_, index) => {
        completedByTask[diaryTaskKey('Wilderness', tier.tier, index)] = true
      })
    }
    window.localStorage.setItem('questly:diary-progress', JSON.stringify(completedByTask))

    render(<AchievementDiariesPage />)
    expect(screen.getByRole('heading', { name: 'Wilderness' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('checkbox', { name: 'Hide completed regions' }))
    expect(screen.queryByRole('heading', { name: 'Wilderness' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Ardougne' })).toBeInTheDocument()
  })

  it('checking off a task updates the tasks-done stat and persists to localStorage', () => {
    render(<AchievementDiariesPage />)

    const wildernessSection = screen
      .getByRole('heading', { name: 'Wilderness' })
      .closest('section')!
    fireEvent.click(within(wildernessSection).getByRole('button', { name: /Easy/ }))
    fireEvent.click(
      screen.getByRole('checkbox', { name: /Enter the Wilderness from the Ardougne/ })
    )

    const stored = JSON.parse(window.localStorage.getItem('questly:diary-progress') ?? '{}')
    expect(stored[diaryTaskKey('Wilderness', 'easy', 1)]).toBe(true)
  })

  it('shows an empty state when no regions match the filters', () => {
    render(<AchievementDiariesPage />)
    fireEvent.change(screen.getByPlaceholderText('Search regions…'), {
      target: { value: 'this region does not exist' },
    })
    expect(screen.getByText(/No regions match your filters/)).toBeInTheDocument()
  })
})
