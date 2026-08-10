import { render, screen } from '@testing-library/react'

import { StatCardGroup } from '@/components/ui/stat-card/stat-card-group'

describe('StatCardGroup', () => {
  it('renders children', () => {
    render(
      <StatCardGroup>
        <span>Child content</span>
      </StatCardGroup>
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('applies responsive layout classes', () => {
    const { container } = render(
      <StatCardGroup>
        <span>Content</span>
      </StatCardGroup>
    )
    expect(container.firstChild).toHaveClass(
      'grid',
      'grid-cols-1',
      'gap-3',
      'sm:flex',
      'sm:flex-row',
      'sm:justify-center'
    )
  })

  it('merges custom className onto the wrapper', () => {
    const { container } = render(
      <StatCardGroup className="custom-class">
        <span>Content</span>
      </StatCardGroup>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
