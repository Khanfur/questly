import type { Miniquest } from '@/lib/types/quest/quest'
import { fireEvent, render, screen } from '@testing-library/react'

import { MiniquestListItem } from '@/components/ui/miniquest-list-item/miniquest-list-item'

const COMPLETED_MINIQUEST: Miniquest = {
  name: 'Enter the Abyss',
  difficulty: null,
  status: 'completed',
  requires: 'Completion of Rune Mysteries',
  members: true,
}

const IN_PROGRESS_MINIQUEST: Miniquest = {
  name: 'Mage Arena I',
  difficulty: 'experienced',
  status: 'in-progress',
  requires: 'Magic level 60',
  members: true,
}

const NOT_STARTED_MINIQUEST: Miniquest = {
  name: "Daddy's Home",
  difficulty: 'novice',
  status: 'not-started',
  requires: 'None',
  members: true,
}

describe('MiniquestListItem', () => {
  it('renders the miniquest name, difficulty and status', () => {
    render(<MiniquestListItem miniquest={COMPLETED_MINIQUEST} />)
    expect(screen.getByText('Enter the Abyss')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  it('does not render a quest points badge, unlike QuestListItem', () => {
    render(<MiniquestListItem miniquest={COMPLETED_MINIQUEST} />)
    expect(screen.queryByText(/QP$/)).not.toBeInTheDocument()
  })

  it('renders a progress bar only for in-progress miniquests', () => {
    render(<MiniquestListItem miniquest={IN_PROGRESS_MINIQUEST} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('does not render a progress bar for completed miniquests', () => {
    render(<MiniquestListItem miniquest={COMPLETED_MINIQUEST} />)
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  it('does not render the status icon as a button when onStatusChange is omitted', () => {
    render(<MiniquestListItem miniquest={COMPLETED_MINIQUEST} />)
    expect(screen.queryByLabelText(/^Mark /)).not.toBeInTheDocument()
  })

  it('calls onStatusChange with the next status in the cycle when the status icon is clicked', () => {
    const onStatusChange = jest.fn()
    render(<MiniquestListItem miniquest={NOT_STARTED_MINIQUEST} onStatusChange={onStatusChange} />)

    fireEvent.click(screen.getByLabelText(/^Mark /))
    expect(onStatusChange).toHaveBeenCalledWith('in-progress')
  })

  it('cycles completed miniquests back to not-started when clicked', () => {
    const onStatusChange = jest.fn()
    render(<MiniquestListItem miniquest={COMPLETED_MINIQUEST} onStatusChange={onStatusChange} />)

    fireEvent.click(screen.getByLabelText(/^Mark /))
    expect(onStatusChange).toHaveBeenCalledWith('not-started')
  })

  it('opens the miniquest detail modal when the chevron is clicked', () => {
    render(<MiniquestListItem miniquest={COMPLETED_MINIQUEST} />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.click(screen.getByLabelText(`View "${COMPLETED_MINIQUEST.name}" miniquest details`))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: COMPLETED_MINIQUEST.name })).toBeInTheDocument()
  })
})
