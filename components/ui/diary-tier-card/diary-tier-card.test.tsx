import type { DiaryTier } from '@/lib/types/diary/diary'
import { render, screen } from '@testing-library/react'

import { DiaryTierCard } from '@/components/ui/diary-tier-card/diary-tier-card'

describe('DiaryTierCard', () => {
  it('renders the tier label and task count', () => {
    const tier: DiaryTier = { tier: 'easy', status: 'complete', completedTasks: 7, totalTasks: 7 }
    render(<DiaryTierCard tier={tier} />)
    expect(screen.getByText('Easy')).toBeInTheDocument()
    expect(screen.getByText('7 / 7 tasks')).toBeInTheDocument()
    expect(screen.getByText('Complete')).toBeInTheDocument()
  })

  it('renders the in-progress status label', () => {
    const tier: DiaryTier = {
      tier: 'hard',
      status: 'in-progress',
      completedTasks: 18,
      totalTasks: 24,
    }
    render(<DiaryTierCard tier={tier} />)
    expect(screen.getByText('In progress')).toBeInTheDocument()
  })

  it('renders the locked status label and dims the card', () => {
    const tier: DiaryTier = { tier: 'elite', status: 'locked', completedTasks: 0, totalTasks: 6 }
    const { container } = render(<DiaryTierCard tier={tier} />)
    expect(screen.getByText('Locked')).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('opacity-70')
  })

  it('reflects task completion in the progress bar width', () => {
    const tier: DiaryTier = {
      tier: 'medium',
      status: 'complete',
      completedTasks: 8,
      totalTasks: 16,
    }
    render(<DiaryTierCard tier={tier} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50')
  })
})
