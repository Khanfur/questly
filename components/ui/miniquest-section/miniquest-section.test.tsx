import type { Miniquest } from '@/lib/types/quest/quest'
import { fireEvent, render, screen } from '@testing-library/react'

import { MiniquestSection } from '@/components/ui/miniquest-section/miniquest-section'

const MINIQUESTS: Miniquest[] = [
  {
    name: 'Enter the Abyss',
    difficulty: null,
    status: 'completed',
    requires: 'Completion of Rune Mysteries',
    members: true,
  },
  {
    name: 'Mage Arena I',
    difficulty: 'experienced',
    status: 'not-started',
    requires: 'Magic level 60',
    members: true,
  },
]

describe('MiniquestSection', () => {
  it('renders the heading and completion count', () => {
    render(<MiniquestSection miniquests={MINIQUESTS} />)
    expect(screen.getByRole('heading', { name: /Miniquests/ })).toBeInTheDocument()
    expect(screen.getByText('1 / 2 complete')).toBeInTheDocument()
  })

  it('renders a row for each miniquest', () => {
    render(<MiniquestSection miniquests={MINIQUESTS} />)
    expect(screen.getByText('Enter the Abyss')).toBeInTheDocument()
    expect(screen.getByText('Mage Arena I')).toBeInTheDocument()
  })

  it('renders only the overridden `filteredMiniquests` list while keeping full-list completion counts', () => {
    render(<MiniquestSection miniquests={MINIQUESTS} filteredMiniquests={[MINIQUESTS[0]]} />)
    expect(screen.getByText('1 / 2 complete')).toBeInTheDocument()
    expect(screen.getByText('Enter the Abyss')).toBeInTheDocument()
    expect(screen.queryByText('Mage Arena I')).not.toBeInTheDocument()
  })

  it('renders nothing in the list when the overridden `filteredMiniquests` list is empty', () => {
    render(<MiniquestSection miniquests={MINIQUESTS} filteredMiniquests={[]} />)
    expect(screen.queryByText('Enter the Abyss')).not.toBeInTheDocument()
    expect(screen.queryByText('Mage Arena I')).not.toBeInTheDocument()
  })

  it('calls onStatusChange with the clicked miniquest name and next status', () => {
    const onStatusChange = jest.fn()
    render(<MiniquestSection miniquests={MINIQUESTS} onStatusChange={onStatusChange} />)

    fireEvent.click(screen.getByLabelText(/^Mark "Mage Arena I" as/))
    expect(onStatusChange).toHaveBeenCalledWith('Mage Arena I', 'in-progress')
  })
})
