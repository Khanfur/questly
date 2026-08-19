import type { QuestTier } from '@/lib/types/quest'
import { fireEvent, render, screen } from '@testing-library/react'

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
      members: false,
    },
    {
      name: 'The Restless Ghost',
      difficulty: 'novice',
      status: 'not-started',
      questPoints: 1,
      requires: 'None',
      members: false,
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

  it('renders only the overridden `quests` list while keeping full-tier completion counts', () => {
    render(<QuestTierGroup tier={TIER} quests={[TIER.quests[0]]} />)
    expect(screen.getByText('1 / 2 complete')).toBeInTheDocument()
    expect(screen.getByText("Cook's Assistant")).toBeInTheDocument()
    expect(screen.queryByText('The Restless Ghost')).not.toBeInTheDocument()
  })

  it('renders nothing in the list when the overridden `quests` list is empty', () => {
    render(<QuestTierGroup tier={TIER} quests={[]} />)
    expect(screen.queryByText("Cook's Assistant")).not.toBeInTheDocument()
    expect(screen.queryByText('The Restless Ghost')).not.toBeInTheDocument()
  })

  it('calls onStatusChange with the clicked quest name and next status', () => {
    const onStatusChange = jest.fn()
    render(<QuestTierGroup tier={TIER} onStatusChange={onStatusChange} />)

    fireEvent.click(screen.getAllByRole('button')[1])
    expect(onStatusChange).toHaveBeenCalledWith('The Restless Ghost', 'in-progress')
  })
})
