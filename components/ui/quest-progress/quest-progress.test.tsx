import { render, screen } from '@testing-library/react'

import { QuestProgress } from '@/components/ui/quest-progress/quest-progress'

describe('QuestProgress', () => {
  it('renders the quest name and status label', () => {
    render(<QuestProgress questName="Dragon Slayer" status="in-progress" />)
    expect(screen.getByText('Dragon Slayer — in-progress')).toBeInTheDocument()
  })

  it.each([
    ['completed', 100],
    ['in-progress', 50],
    ['not-started', 0],
  ] as const)('renders the correct progress value for status "%s"', (status, value) => {
    render(<QuestProgress questName="Dragon Slayer" status={status} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', String(value))
  })
})
