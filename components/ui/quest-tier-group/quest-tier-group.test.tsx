import type { QuestTier } from '@/lib/types/quest'
import { render, screen } from '@testing-library/react'

import { QuestTierGroup } from '@/components/ui/quest-tier-group/quest-tier-group'

const TIER: QuestTier = {
  difficulty: 'novice',
  quests: [
    {
      name: "Cook's Assistant",
      difficulty: 'novice',
      status: 'completed',
      questPoints: 1,
      requires: 'None',
    },
    {
      name: 'The Restless Ghost',
      difficulty: 'novice',
      status: 'not-started',
      questPoints: 1,
      requires: 'None',
    },
  ],
}

describe('QuestTierGroup', () => {
  it('renders the difficulty label and completion count', () => {
    render(<QuestTierGroup tier={TIER} />)
    expect(screen.getByRole('heading', { name: /Novice/ })).toBeInTheDocument()
    expect(screen.getByText('1 / 2 complete')).toBeInTheDocument()
  })

  it('renders a row for each quest in the tier', () => {
    render(<QuestTierGroup tier={TIER} />)
    expect(screen.getByText("Cook's Assistant")).toBeInTheDocument()
    expect(screen.getByText('The Restless Ghost')).toBeInTheDocument()
  })
})
