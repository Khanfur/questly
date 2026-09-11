import { render, screen } from '@testing-library/react'

import { ChatMessage } from '@/components/ui/chat-message/chat-message'

describe('ChatMessage', () => {
  it('renders a Sage message with the Sage name and a chat head', () => {
    render(<ChatMessage message={{ id: '1', role: 'sage', text: 'Ask me anything.' }} />)
    expect(screen.getByText('The Sage')).toBeInTheDocument()
    expect(screen.getByText('Ask me anything.')).toBeInTheDocument()
  })

  it('renders a user message labelled "You"', () => {
    render(<ChatMessage message={{ id: '2', role: 'user', text: 'Any tips on quests?' }} />)
    expect(screen.getByText('You')).toBeInTheDocument()
    expect(screen.getByText('Any tips on quests?')).toBeInTheDocument()
  })

  it('supports a custom Sage name', () => {
    render(
      <ChatMessage message={{ id: '3', role: 'sage', text: 'Hello.' }} sageName="Old Man Gnome" />
    )
    expect(screen.getByText('Old Man Gnome')).toBeInTheDocument()
  })
})
