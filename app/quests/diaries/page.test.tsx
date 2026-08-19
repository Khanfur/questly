import AchievementDiariesPage from '@/app/quests/diaries/page'
import { render, screen } from '@testing-library/react'

jest.mock('next/navigation', () => ({
  usePathname: () => '/quests/diaries',
}))

describe('AchievementDiariesPage', () => {
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
})
