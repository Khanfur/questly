import type { DiaryTier } from '@/lib/types/diary'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

  it('renders the not-started status label', () => {
    const tier: DiaryTier = {
      tier: 'elite',
      status: 'not-started',
      completedTasks: 0,
      totalTasks: 6,
    }
    render(<DiaryTierCard tier={tier} />)
    expect(screen.getByText('Not started')).toBeInTheDocument()
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

  it('renders as a button and calls onClick when provided', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    const tier: DiaryTier = { tier: 'easy', status: 'complete', completedTasks: 7, totalTasks: 7 }
    render(<DiaryTierCard tier={tier} onClick={onClick} />)

    await user.click(screen.getByRole('button', { name: /Easy/ }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
