import { render, screen } from '@testing-library/react'

import { Section } from '@/components/ui/section/section'

describe('Section', () => {
  it('renders the title as a heading', () => {
    render(<Section title="Colors">content</Section>)
    expect(screen.getByRole('heading', { level: 2, name: 'Colors' })).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <Section title="Colors">
        <span>Child content</span>
      </Section>
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('merges custom className onto the content wrapper', () => {
    render(
      <Section title="Colors" className="custom-class">
        <span>Child content</span>
      </Section>
    )
    expect(screen.getByText('Child content').parentElement).toHaveClass(
      'flex',
      'flex-wrap',
      'items-center',
      'gap-2',
      'custom-class'
    )
  })
})
