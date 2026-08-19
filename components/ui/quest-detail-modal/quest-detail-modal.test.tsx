import type { Quest } from '@/lib/types/quest'
import { render, screen } from '@testing-library/react'

import { QuestDetailModal } from '@/components/ui/quest-detail-modal/quest-detail-modal'

const FULL_QUEST: Quest = {
  name: "Cook's Assistant",
  difficulty: 'novice',
  status: 'not-started',
  questPoints: 1,
  requires: 'None',
  members: false,
  start: 'Talk to the Cook in the kitchen of Lumbridge Castle.',
  description: 'The Cook is in a panic! Help him gather ingredients for the Duke of Lumbridge.',
  series: undefined,
  length: 'Short',
  enemies: undefined,
  itemsRequired: ['Bucket of milk', 'Egg', 'Pot of flour'],
  wikiUrl: 'https://oldschool.runescape.wiki/w/Cook%27s_Assistant',
}

const MINIMAL_QUEST: Quest = {
  name: 'The Restless Ghost',
  difficulty: 'novice',
  status: 'not-started',
  questPoints: 1,
  requires: 'None',
  members: false,
}

describe('QuestDetailModal', () => {
  it('renders nothing when no quest is provided', () => {
    render(<QuestDetailModal quest={null} open onOpenChange={jest.fn()} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders nothing when closed', () => {
    render(<QuestDetailModal quest={FULL_QUEST} open={false} onOpenChange={jest.fn()} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the quest name, difficulty and start text when open', () => {
    render(<QuestDetailModal quest={FULL_QUEST} open onOpenChange={jest.fn()} />)

    expect(screen.getByRole('heading', { name: FULL_QUEST.name })).toBeInTheDocument()
    expect(screen.getAllByText('Novice').length).toBeGreaterThan(0)
    expect(screen.getByText(/Talk to the Cook/)).toBeInTheDocument()
  })

  it('renders the description, items required and a wiki link when present', () => {
    render(<QuestDetailModal quest={FULL_QUEST} open onOpenChange={jest.fn()} />)

    expect(screen.getByText(/The Cook is in a panic/)).toBeInTheDocument()
    expect(screen.getByText('Bucket of milk')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /View on Wiki/ })).toHaveAttribute(
      'href',
      FULL_QUEST.wikiUrl
    )
  })

  it('omits optional sections that have no data', () => {
    render(<QuestDetailModal quest={MINIMAL_QUEST} open onOpenChange={jest.fn()} />)

    expect(screen.queryByText('Description')).not.toBeInTheDocument()
    expect(screen.queryByText('Items Required')).not.toBeInTheDocument()
    expect(screen.queryByText('Enemies to Defeat')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /View on Wiki/ })).not.toBeInTheDocument()
  })
})
