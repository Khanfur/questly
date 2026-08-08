import { render, screen } from '@testing-library/react'

import { Container } from '@/components/layout/container'

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Hello</Container>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('merges custom className with default classes', () => {
    render(<Container className="custom-class">Content</Container>)
    const container = screen.getByText('Content')
    expect(container).toHaveClass('mx-auto', 'w-full', 'max-w-7xl', 'custom-class')
  })
})
