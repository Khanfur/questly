import type { DiaryRegion } from '@/lib/types/diary'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DiaryRegionCard } from '@/components/ui/diary-region-card/diary-region-card'

const REGION: DiaryRegion = {
  name: 'Ardougne',
  tiers: [
    {
      tier: 'easy',
      status: 'complete',
      completedTasks: 7,
      totalTasks: 7,
      tasks: [{ description: 'Do a thing.', requirements: [], completed: true }],
    },
    { tier: 'medium', status: 'complete', completedTasks: 16, totalTasks: 16 },
    { tier: 'hard', status: 'in-progress', completedTasks: 18, totalTasks: 24 },
    { tier: 'elite', status: 'not-started', completedTasks: 0, totalTasks: 6 },
  ],
}

describe('DiaryRegionCard', () => {
  it('renders the region name and tier completion summary', () => {
    render(<DiaryRegionCard region={REGION} />)
    expect(screen.getByRole('heading', { name: 'Ardougne' })).toBeInTheDocument()
    expect(screen.getByText('2 / 4 tiers complete')).toBeInTheDocument()
  })

  it('renders a card for each tier', () => {
    render(<DiaryRegionCard region={REGION} />)
    expect(screen.getByText('Easy')).toBeInTheDocument()
    expect(screen.getByText('Medium')).toBeInTheDocument()
    expect(screen.getByText('Hard')).toBeInTheDocument()
    expect(screen.getByText('Elite')).toBeInTheDocument()
  })

  it('opens the tier detail modal when a tier is clicked', async () => {
    const user = userEvent.setup()
    render(<DiaryRegionCard region={REGION} />)

    await user.click(screen.getByRole('button', { name: /Easy/ }))
    expect(screen.getByText('Do a thing.')).toBeInTheDocument()
  })

  it('forwards the clicked tier and task index to onToggleTask', async () => {
    const user = userEvent.setup()
    const onToggleTask = jest.fn()
    render(<DiaryRegionCard region={REGION} onToggleTask={onToggleTask} />)

    await user.click(screen.getByRole('button', { name: /Easy/ }))
    await user.click(screen.getByRole('checkbox', { name: /Do a thing/ }))

    expect(onToggleTask).toHaveBeenCalledWith('easy', 0)
  })

  it('reflects an updated region prop in the still-open modal (e.g. after toggling a task)', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<DiaryRegionCard region={REGION} />)

    await user.click(screen.getByRole('button', { name: /Easy/ }))
    expect(screen.getByRole('checkbox', { name: /Do a thing/ })).toBeChecked()

    const updatedRegion: DiaryRegion = {
      ...REGION,
      tiers: REGION.tiers.map((tier) =>
        tier.tier === 'easy'
          ? {
              ...tier,
              tasks: [{ description: 'Do a thing.', requirements: [], completed: false }],
              completedTasks: 0,
            }
          : tier
      ),
    }
    rerender(<DiaryRegionCard region={updatedRegion} />)

    expect(screen.getByRole('checkbox', { name: /Do a thing/ })).not.toBeChecked()
  })
})
