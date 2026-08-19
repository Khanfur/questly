import type { Quest } from '@/lib/types/quest'
import { fireEvent, render, screen } from '@testing-library/react'

import { QuestListItem } from '@/components/ui/quest-list-item/quest-list-item'

const COMPLETED_QUEST: Quest = {
  name: "Cook's Assistant",
  difficulty: 'novice',
  status: 'completed',
  questPoints: 1,
  requires: 'None',
  members: false,
}

const IN_PROGRESS_QUEST: Quest = {
  name: 'Dragon Slayer II',
  difficulty: 'grandmaster',
  status: 'in-progress',
  questPoints: 5,
  requires: 'Level 200 Quest Points, several skills 50-75',
  members: true,
}

const NOT_STARTED_QUEST_WITH_NOTE: Quest = {
  name: 'The Restless Ghost',
  difficulty: 'novice',
  status: 'not-started',
  questPoints: 1,
  requires: 'None',
  note: 'Ten minutes, tops. Stop putting it off.',
  members: false,
}

describe('QuestListItem', () => {
  it('renders the quest name, difficulty, requirements and points', () => {
    render(<QuestListItem quest={COMPLETED_QUEST} />)
    expect(screen.getByText("Cook's Assistant")).toBeInTheDocument()
    expect(screen.getByText('Novice')).toBeInTheDocument()
    expect(screen.getByText(/Requires: None/)).toBeInTheDocument()
    expect(screen.getByText('1 QP')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  it('renders a progress bar only for in-progress quests', () => {
    render(<QuestListItem quest={IN_PROGRESS_QUEST} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('does not render a progress bar for completed quests', () => {
    render(<QuestListItem quest={COMPLETED_QUEST} />)
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  it('renders the optional flavour note when provided', () => {
    render(<QuestListItem quest={NOT_STARTED_QUEST_WITH_NOTE} />)
    expect(screen.getByText(/Ten minutes, tops/)).toBeInTheDocument()
  })

  it('does not render the status icon as a button when onStatusChange is omitted', () => {
    render(<QuestListItem quest={COMPLETED_QUEST} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('calls onStatusChange with the next status in the cycle when the status icon is clicked', () => {
    const onStatusChange = jest.fn()
    render(<QuestListItem quest={NOT_STARTED_QUEST_WITH_NOTE} onStatusChange={onStatusChange} />)

    fireEvent.click(screen.getByRole('button'))
    expect(onStatusChange).toHaveBeenCalledWith('in-progress')
  })

  it('cycles completed quests back to not-started when clicked', () => {
    const onStatusChange = jest.fn()
    render(<QuestListItem quest={COMPLETED_QUEST} onStatusChange={onStatusChange} />)

    fireEvent.click(screen.getByRole('button'))
    expect(onStatusChange).toHaveBeenCalledWith('not-started')
  })
})
