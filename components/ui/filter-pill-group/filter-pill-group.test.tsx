import { fireEvent, render, screen } from '@testing-library/react'

import { FilterPillGroup } from '@/components/ui/filter-pill-group/filter-pill-group'

const ITEMS = ['All', 'Not started', 'In progress', 'Completed'] as const

describe('FilterPillGroup', () => {
  it('renders a pill for each item', () => {
    render(<FilterPillGroup items={ITEMS} activeItem="All" />)
    for (const item of ITEMS) {
      expect(screen.getByText(item)).toBeInTheDocument()
    }
  })

  it('highlights the active item', () => {
    render(<FilterPillGroup items={ITEMS} activeItem="Completed" />)
    expect(screen.getByText('Completed')).toHaveClass('bg-primary')
    expect(screen.getByText('All')).not.toHaveClass('bg-primary')
  })

  it('renders each item as a button reflecting its active state via aria-pressed', () => {
    render(<FilterPillGroup items={ITEMS} activeItem="All" />)
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Completed' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
  })

  it('calls onSelect with the clicked item', () => {
    const onSelect = jest.fn()
    render(<FilterPillGroup items={ITEMS} activeItem="All" onSelect={onSelect} />)
    fireEvent.click(screen.getByRole('button', { name: 'In progress' }))
    expect(onSelect).toHaveBeenCalledWith('In progress')
  })
})
