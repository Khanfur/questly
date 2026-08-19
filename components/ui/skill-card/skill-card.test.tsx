import { render, screen } from '@testing-library/react'

import { SkillCard } from '@/components/ui/skill-card/skill-card'

describe('SkillCard', () => {
  it('renders the skill level', () => {
    render(<SkillCard skill={{ name: 'Attack', level: 99, icon: 'attack' }} />)
    expect(screen.getByText('99')).toBeInTheDocument()
  })

  it('renders the skill icon with the skill name as alt text', () => {
    render(<SkillCard skill={{ name: 'Attack', level: 99, icon: 'attack' }} />)
    expect(screen.getByRole('img', { name: 'Attack' })).toBeInTheDocument()
  })

  it('does not render an icon when the skill has no icon', () => {
    render(<SkillCard skill={{ name: 'Attack', level: 99, icon: '' }} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('merges custom className onto the wrapper', () => {
    const { container } = render(
      <SkillCard skill={{ name: 'Attack', level: 99, icon: 'attack' }} className="custom-class" />
    )
    expect(container.firstChild).toHaveClass('stat-card', 'custom-class')
  })

  it('renders a skeleton placeholder instead of the level when loading', () => {
    render(<SkillCard skill={{ name: 'Attack', level: 99, icon: 'attack' }} loading />)
    expect(screen.queryByText('99')).not.toBeInTheDocument()
    expect(screen.queryByRole('img', { name: 'Attack' })).not.toBeInTheDocument()
  })
})
