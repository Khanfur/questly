import { render, screen } from '@testing-library/react'

import { SkillCardGrid } from '@/components/ui/skill-card/skill-card-grid'

describe('SkillCardGrid', () => {
  it('renders children', () => {
    render(
      <SkillCardGrid>
        <span>Child content</span>
      </SkillCardGrid>
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('applies responsive grid classes', () => {
    const { container } = render(
      <SkillCardGrid>
        <span>Content</span>
      </SkillCardGrid>
    )
    expect(container.firstChild).toHaveClass('grid', 'grid-cols-4', 'gap-2', 'sm:grid-cols-6')
  })

  it('merges custom className onto the wrapper', () => {
    const { container } = render(
      <SkillCardGrid className="custom-class">
        <span>Content</span>
      </SkillCardGrid>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
