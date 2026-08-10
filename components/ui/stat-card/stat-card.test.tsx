import { render, screen } from '@testing-library/react'

import { StatCard } from '@/components/ui/stat-card/stat-card'

describe('StatCard', () => {
  it('renders the label and stat', () => {
    render(<StatCard label="Combat Level" stat={112} />)
    expect(screen.getByText('Combat Level')).toBeInTheDocument()
    expect(screen.getByText('112')).toBeInTheDocument()
  })

  it('renders a secondary stat when provided', () => {
    render(<StatCard label="Quest Points" stat={284} secondaryStat={341} />)
    expect(screen.getByText(/284/)).toBeInTheDocument()
    expect(screen.getByText(/341/)).toBeInTheDocument()
  })

  it('does not render a secondary stat when not provided', () => {
    render(<StatCard label="Combat Level" stat={112} />)
    expect(screen.queryByText('/')).not.toBeInTheDocument()
  })

  it('merges custom className onto the wrapper', () => {
    const { container } = render(
      <StatCard label="Combat Level" stat={112} className="custom-class" />
    )
    expect(container.firstChild).toHaveClass('stat-card', 'custom-class')
  })
})
