import { render, screen } from '@testing-library/react'

import { QuestDifficultyBadge } from '@/components/ui/quest-difficulty-badge/quest-difficulty-badge'

describe('QuestDifficultyBadge', () => {
  it.each([
    ['novice', 'Novice'],
    ['intermediate', 'Intermediate'],
    ['experienced', 'Experienced'],
    ['master', 'Master'],
    ['grandmaster', 'Grandmaster'],
  ] as const)('renders the label for %s difficulty', (difficulty, label) => {
    render(<QuestDifficultyBadge difficulty={difficulty} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it('merges custom className onto the badge', () => {
    render(<QuestDifficultyBadge difficulty="novice" className="custom-class" />)
    expect(screen.getByText('Novice')).toHaveClass('custom-class')
  })
})
