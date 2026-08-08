import { render } from '@testing-library/react'

import { SectionDivider } from '@/components/ui/section-divider/section-divider'

describe('SectionDivider', () => {
  it('renders two separators and a center marker', () => {
    const { container } = render(<SectionDivider />)
    expect(container.querySelectorAll('[data-slot="separator"]')).toHaveLength(2)
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })

  it('merges custom className onto the wrapper', () => {
    const { container } = render(<SectionDivider className="custom-class" />)
    expect(container.firstChild).toHaveClass('flex', 'items-center', 'gap-3', 'custom-class')
  })
})
