import { render } from '@testing-library/react'

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
})
