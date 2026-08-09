import { render, screen } from '@testing-library/react'

import { ChatHead } from '@/components/ui/chat-head/chat-head'

describe('ChatHead', () => {
  it('renders the fallback avatar text', () => {
    render(<ChatHead avatar="" fallbackAvatar="JD" status="online" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it.each([
    ['online', 'bg-chart-3'],
    ['offline', 'bg-destructive'],
    ['away', 'bg-primary'],
  ] as const)('applies the correct status color for "%s"', (status, expectedClass) => {
    const { container } = render(<ChatHead avatar="" fallbackAvatar="JD" status={status} />)
    const badge = container.querySelector('[data-slot="avatar-badge"]')
    expect(badge).toHaveClass(expectedClass)
  })
})
