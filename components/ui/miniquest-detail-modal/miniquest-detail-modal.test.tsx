import type { Miniquest } from '@/lib/types/quest/quest'
import { render, screen } from '@testing-library/react'

import { MiniquestDetailModal } from '@/components/ui/miniquest-detail-modal/miniquest-detail-modal'

const FULL_MINIQUEST: Miniquest = {
  name: 'Enter the Abyss',
  difficulty: null,
  status: 'not-started',
  requires: 'Completion of Rune Mysteries',
  members: true,
  start: 'Speak to Mandrith in Edgeville.',
  description: 'Enter the Abyss to unlock rune crafting teleports for every altar.',
  series: undefined,
  length: 'Short',
  enemies: undefined,
  itemsRequired: ['Any pickaxe'],
  releaseDate: '5 June 2007',
  wikiUrl: 'https://oldschool.runescape.wiki/w/Enter_the_Abyss',
}

const MINIMAL_MINIQUEST: Miniquest = {
  name: "Daddy's Home",
  difficulty: 'novice',
  status: 'not-started',
  requires: 'None',
  members: true,
}

describe('MiniquestDetailModal', () => {
  it('renders nothing when no miniquest is provided', () => {
    render(<MiniquestDetailModal miniquest={null} open onOpenChange={jest.fn()} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders nothing when closed', () => {
    render(
      <MiniquestDetailModal miniquest={FULL_MINIQUEST} open={false} onOpenChange={jest.fn()} />
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the miniquest name and start text when open', () => {
    render(<MiniquestDetailModal miniquest={FULL_MINIQUEST} open onOpenChange={jest.fn()} />)

    expect(screen.getByRole('heading', { name: FULL_MINIQUEST.name })).toBeInTheDocument()
    expect(screen.getByText(/Speak to Mandrith/)).toBeInTheDocument()
  })

  it('omits the difficulty badge when difficulty is null, unlike QuestDetailModal', () => {
    render(<MiniquestDetailModal miniquest={FULL_MINIQUEST} open onOpenChange={jest.fn()} />)
    expect(screen.queryByText('Novice')).not.toBeInTheDocument()
  })

  it('has no quest points field, unlike QuestDetailModal', () => {
    render(<MiniquestDetailModal miniquest={FULL_MINIQUEST} open onOpenChange={jest.fn()} />)
    expect(screen.queryByText(/Quest Points/)).not.toBeInTheDocument()
  })

  it('renders the release date when present, and "Unknown" when absent', () => {
    render(<MiniquestDetailModal miniquest={FULL_MINIQUEST} open onOpenChange={jest.fn()} />)
    expect(screen.getByText('5 June 2007')).toBeInTheDocument()

    render(<MiniquestDetailModal miniquest={MINIMAL_MINIQUEST} open onOpenChange={jest.fn()} />)
    expect(screen.getAllByText('Unknown').length).toBeGreaterThan(0)
  })

  it('renders the description, items required and a wiki link when present', () => {
    render(<MiniquestDetailModal miniquest={FULL_MINIQUEST} open onOpenChange={jest.fn()} />)

    expect(screen.getByText(/unlock rune crafting teleports/)).toBeInTheDocument()
    expect(screen.getByText('Any pickaxe')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /View on Wiki/ })).toHaveAttribute(
      'href',
      FULL_MINIQUEST.wikiUrl
    )
  })

  it('omits optional sections that have no data', () => {
    render(<MiniquestDetailModal miniquest={MINIMAL_MINIQUEST} open onOpenChange={jest.fn()} />)

    expect(screen.queryByText('Description')).not.toBeInTheDocument()
    expect(screen.queryByText('Items Required')).not.toBeInTheDocument()
    expect(screen.queryByText('Enemies to Defeat')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /View on Wiki/ })).not.toBeInTheDocument()
  })
})
