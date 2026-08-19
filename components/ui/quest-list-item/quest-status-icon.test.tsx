import { fireEvent, render } from '@testing-library/react'

import { QuestStatusIcon } from '@/components/ui/quest-list-item/quest-status-icon'

describe('QuestStatusIcon', () => {
  it('renders a check icon for completed quests', () => {
    const { container } = render(<QuestStatusIcon status="completed" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('bg-secondary')
  })

  it('renders a partial ring for in-progress quests', () => {
    const { container } = render(<QuestStatusIcon status="in-progress" />)
    expect(container.querySelector('svg')).not.toBeInTheDocument()
    expect((container.firstChild as HTMLElement).style.background).toContain('conic-gradient')
  })

  it('renders an empty outline for not-started quests', () => {
    const { container } = render(<QuestStatusIcon status="not-started" />)
    expect(container.firstChild).toHaveClass('border-muted-foreground/40')
  })

  it('merges custom className onto the wrapper', () => {
    const { container } = render(<QuestStatusIcon status="not-started" className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders as a button with an accessible label when onClick is provided', () => {
    const onClick = jest.fn()
    const { getByRole } = render(
      <QuestStatusIcon status="not-started" onClick={onClick} label="Mark as in progress" />
    )
    const button = getByRole('button', { name: 'Mark as in progress' })
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders as a static, non-interactive span when onClick is not provided', () => {
    const { container } = render(<QuestStatusIcon status="not-started" />)
    expect(container.querySelector('button')).not.toBeInTheDocument()
  })
})
