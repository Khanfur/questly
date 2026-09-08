import { render, screen } from '@testing-library/react'

import { ViewToggle } from '@/components/ui/view-toggle/view-toggle'

jest.mock('next/navigation', () => ({
  usePathname: () => '/quests',
}))

const ITEMS = [
  { href: '/quests', label: 'Quest Log' },
  { href: '/quests/diaries', label: 'Achievement Diaries' },
] as const

describe('ViewToggle', () => {
  it('renders a link for each item', () => {
    render(<ViewToggle items={ITEMS} />)
    expect(screen.getByRole('link', { name: 'Quest Log' })).toHaveAttribute('href', '/quests')
    expect(screen.getByRole('link', { name: 'Achievement Diaries' })).toHaveAttribute(
      'href',
      '/quests/diaries'
    )
  })

  it('marks the item matching the current pathname as active', () => {
    render(<ViewToggle items={ITEMS} />)
    expect(screen.getByRole('link', { name: 'Quest Log' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Achievement Diaries' })).not.toHaveAttribute(
      'aria-current'
    )
  })
})
