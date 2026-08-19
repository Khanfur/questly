import type { DiaryRegion } from '@/lib/types/diary/diary'
import { render, screen } from '@testing-library/react'

import { DiaryRegionCard } from '@/components/ui/diary-region-card/diary-region-card'

const REGION: DiaryRegion = {
  name: 'Ardougne',
  tiers: [
    { tier: 'easy', status: 'complete', completedTasks: 7, totalTasks: 7 },
    { tier: 'medium', status: 'complete', completedTasks: 16, totalTasks: 16 },
    { tier: 'hard', status: 'in-progress', completedTasks: 18, totalTasks: 24 },
    { tier: 'elite', status: 'locked', completedTasks: 0, totalTasks: 6 },
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
})
