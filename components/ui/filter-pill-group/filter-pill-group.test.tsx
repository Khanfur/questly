import { render, screen } from '@testing-library/react'

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
})
