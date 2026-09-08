import { render, screen } from '@testing-library/react'

import { QuestDifficultyBadge } from '@/components/ui/quest-difficulty-badge/quest-difficulty-badge'

describe('QuestDifficultyBadge', () => {
  it.each([
    ['novice', 'novice'],
    ['intermediate', 'intermediate'],
    ['experienced', 'experienced'],
    ['special', 'special'],
    ['master', 'master'],
    ['grandmaster', 'grandmaster'],
  ] as const)('renders the label for %s difficulty', (difficulty, label) => {
    render(<QuestDifficultyBadge difficulty={difficulty} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it('merges custom className onto the badge', () => {
    render(<QuestDifficultyBadge difficulty="novice" className="custom-class" />)
    expect(screen.getByText('novice')).toHaveClass('custom-class')
  })

  it('renders nothing when difficulty is null', () => {
    const { container } = render(<QuestDifficultyBadge difficulty={null} />)
    expect(container).toBeEmptyDOMElement()
  })
})
