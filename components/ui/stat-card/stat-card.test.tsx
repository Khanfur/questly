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

  it('renders a skeleton placeholder instead of the stat when loading', () => {
    render(<StatCard label="Combat Level" stat={112} loading />)
    expect(screen.queryByText('112')).not.toBeInTheDocument()
    expect(screen.getByText('Combat Level')).toBeInTheDocument()
  })

  it('renders a caption when provided', () => {
    render(<StatCard label="In Progress" stat={1} caption="Dragon Slayer II" />)
    expect(screen.getByText('Dragon Slayer II')).toBeInTheDocument()
  })

  it('does not render a caption when not provided', () => {
    render(<StatCard label="Combat Level" stat={112} />)
    expect(screen.queryByText('Dragon Slayer II')).not.toBeInTheDocument()
  })
})
