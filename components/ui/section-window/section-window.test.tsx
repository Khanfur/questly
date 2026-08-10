import { render, screen } from '@testing-library/react'

import { SectionWindow } from '@/components/ui/section-window/section-window'

describe('SectionWindow', () => {
  it('renders the title as a heading', () => {
    render(<SectionWindow title="Skills">content</SectionWindow>)
    expect(screen.getByRole('heading', { level: 3, name: 'Skills' })).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <SectionWindow title="Skills">
        <span>Child content</span>
      </SectionWindow>
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('does not render an icon when none is provided', () => {
    render(<SectionWindow title="Skills">content</SectionWindow>)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('renders an icon image when one is provided', () => {
    render(
      <SectionWindow title="Skills" icon="attack">
        content
      </SectionWindow>
    )
    expect(screen.getByRole('img', { name: 'Skills' })).toBeInTheDocument()
  })

  it('merges custom className onto the wrapper', () => {
    const { container } = render(
      <SectionWindow title="Skills" className="custom-class">
        content
      </SectionWindow>
    )
    expect(container.firstChild).toHaveClass('flex', 'flex-col', 'custom-class')
  })
})
