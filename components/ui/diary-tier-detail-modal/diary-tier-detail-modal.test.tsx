import type { DiaryTier } from '@/lib/types/diary'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DiaryTierDetailModal } from '@/components/ui/diary-tier-detail-modal/diary-tier-detail-modal'

const TIER: DiaryTier = {
  tier: 'easy',
  status: 'in-progress',
  completedTasks: 1,
  totalTasks: 2,
  tasks: [
    {
      description: 'Steal a cake.',
      requirements: ['Thieving level 5', 'Quest Completion of Shilo Village', 'Any pickaxe'],
      completed: true,
    },
    { description: 'Use the altar.', requirements: [], completed: false },
    {
      description: 'Buy a newspaper. Note: Can be bought from Benny in Varrock Square.',
      requirements: [],
      completed: false,
    },
  ],
}

describe('DiaryTierDetailModal', () => {
  it('renders nothing when no tier is provided', () => {
    render(<DiaryTierDetailModal regionName="Ardougne" tier={null} open onOpenChange={jest.fn()} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders nothing when closed', () => {
    render(
      <DiaryTierDetailModal
        regionName="Ardougne"
        tier={TIER}
        open={false}
        onOpenChange={jest.fn()}
      />
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the region/tier title, progress and every task', () => {
    render(<DiaryTierDetailModal regionName="Ardougne" tier={TIER} open onOpenChange={jest.fn()} />)

    expect(screen.getByRole('heading', { name: /Ardougne.*Easy/ })).toBeInTheDocument()
    expect(screen.getByText('1 / 2 tasks complete')).toBeInTheDocument()
    expect(screen.getByText('Steal a cake.')).toBeInTheDocument()
    expect(screen.getByText('Use the altar.')).toBeInTheDocument()
  })

  it('groups a task’s requirements into Skills/Quests/Items sections', () => {
    render(<DiaryTierDetailModal regionName="Ardougne" tier={TIER} open onOpenChange={jest.fn()} />)

    expect(screen.getByText('Skills:')).toBeInTheDocument()
    expect(screen.getByText(/Thieving level 5/)).toBeInTheDocument()
    expect(screen.getByText('Quests:')).toBeInTheDocument()
    expect(screen.getByText(/Completion of Shilo Village/)).toBeInTheDocument()
    expect(screen.getByText('Items:')).toBeInTheDocument()
    expect(screen.getByText(/Any pickaxe/)).toBeInTheDocument()
  })

  it('splits out a task’s "Note:" aside into a smaller, separate line', () => {
    render(<DiaryTierDetailModal regionName="Ardougne" tier={TIER} open onOpenChange={jest.fn()} />)

    expect(screen.getByText('Buy a newspaper.')).toBeInTheDocument()
    const note = screen.getByText('Can be bought from Benny in Varrock Square.')
    expect(note).toHaveClass('text-xs')
  })

  it('renders a fallback message when the tier has no task data', () => {
    const noTasksTier: DiaryTier = {
      tier: 'elite',
      status: 'not-started',
      completedTasks: 0,
      totalTasks: 6,
    }
    render(
      <DiaryTierDetailModal
        regionName="Ardougne"
        tier={noTasksTier}
        open
        onOpenChange={jest.fn()}
      />
    )
    expect(screen.getByText('No task data available for this tier.')).toBeInTheDocument()
  })

  it('calls onToggleTask with the clicked task index', async () => {
    const user = userEvent.setup()
    const onToggleTask = jest.fn()
    render(
      <DiaryTierDetailModal
        regionName="Ardougne"
        tier={TIER}
        open
        onOpenChange={jest.fn()}
        onToggleTask={onToggleTask}
      />
    )

    await user.click(screen.getByRole('checkbox', { name: /Use the altar/ }))
    expect(onToggleTask).toHaveBeenCalledWith(1)
  })
})
