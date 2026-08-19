import { render, screen } from '@testing-library/react'

import { ErrorMessage } from './error-message'

describe('ErrorMessage', () => {
  it('renders the error message', () => {
    render(<ErrorMessage message="Something went wrong" />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('applies text-sm and text-destructive classes', () => {
    render(<ErrorMessage message="Error" />)
    const span = screen.getByText('Error')
    expect(span).toHaveClass('text-sm', 'text-destructive')
  })

  it('renders nothing when message is null', () => {
    const { container } = render(<ErrorMessage message={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders nothing when message is undefined', () => {
    const { container } = render(<ErrorMessage message={undefined} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders nothing when no message prop is provided', () => {
    const { container } = render(<ErrorMessage />)
    expect(container.firstChild).toBeNull()
  })

  it('applies additional className when provided', () => {
    render(<ErrorMessage message="Error" className="mt-2" />)
    const span = screen.getByText('Error')
    expect(span).toHaveClass('mt-2')
  })
})
