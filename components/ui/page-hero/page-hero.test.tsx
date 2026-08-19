import { render, screen } from '@testing-library/react'

import { PageHero } from '@/components/ui/page-hero/page-hero'

describe('PageHero', () => {
  it('renders the eyebrow, title lines and description', () => {
    render(
      <PageHero
        eyebrow="Quest Log"
        titleLines={['293 quests.', "You've earned the right to be smug about 284."]}
        description="Every quest in Gielinor."
      />
    )
    expect(screen.getByText('Quest Log')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '293 quests.' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: "You've earned the right to be smug about 284." })
    ).toBeInTheDocument()
    expect(screen.getByText('Every quest in Gielinor.')).toBeInTheDocument()
  })

  it('renders optional actions and stats', () => {
    render(
      <PageHero
        eyebrow="Quest Log"
        titleLines={['293 quests.']}
        description="desc"
        actions={<span>Toggle</span>}
        stats={<span>Stats</span>}
      />
    )
    expect(screen.getByText('Toggle')).toBeInTheDocument()
    expect(screen.getByText('Stats')).toBeInTheDocument()
  })
})
