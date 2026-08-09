import { render, screen } from '@testing-library/react'

import { Footer } from '@/components/layout/footer/footer'

describe('Footer', () => {
  it('renders the Questly brand link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /questly/i })).toHaveAttribute('href', '/')
  })

  it('renders all feature links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Stats' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Quests' })).toHaveAttribute('href', '/quests')
    expect(screen.getByRole('link', { name: 'Ask the Sage' })).toHaveAttribute(
      'href',
      '/ask-the-sage'
    )
  })

  it('renders the report an issue resource link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Report an issue' })).toHaveAttribute(
      'href',
      'https://github.com/Khanfur/questly/issues'
    )
  })

  it('renders the disclaimer text', () => {
    render(<Footer />)
    expect(
      screen.getByText('Questly is a fan-made companion app and is not affiliated with Jagex.')
    ).toBeInTheDocument()
  })
})
