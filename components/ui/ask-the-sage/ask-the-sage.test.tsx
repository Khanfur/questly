import { fireEvent, render, screen } from '@testing-library/react'

import { AskTheSage } from '@/components/ui/ask-the-sage/ask-the-sage'

const suggestions = [
  { id: 'q1', label: 'What should I do next for quest points?' },
  { id: 'q2', label: 'Best in slot for my current combat level?' },
]

describe('AskTheSage', () => {
  it('renders the message and section heading', () => {
    render(<AskTheSage message="Back again? Ask me anything." suggestions={[]} />)
    expect(screen.getByText('Ask the Sage')).toBeInTheDocument()
    expect(screen.getByText('Back again? Ask me anything.')).toBeInTheDocument()
  })

  it('renders numbered suggestions', () => {
    render(<AskTheSage message="Ask away." suggestions={suggestions} />)
    expect(screen.getByText(suggestions[0].label)).toBeInTheDocument()
    expect(screen.getByText(suggestions[1].label)).toBeInTheDocument()
  })

  it('calls onSelectSuggestion with the clicked suggestion', () => {
    const onSelectSuggestion = jest.fn()
    render(
      <AskTheSage
        message="Ask away."
        suggestions={suggestions}
        onSelectSuggestion={onSelectSuggestion}
      />
    )
    fireEvent.click(screen.getByText(suggestions[0].label))
    expect(onSelectSuggestion).toHaveBeenCalledWith(suggestions[0])
  })

  it('calls onContinue when the continue link is clicked', () => {
    const onContinue = jest.fn()
    render(<AskTheSage message="Ask away." suggestions={[]} onContinue={onContinue} />)
    fireEvent.click(screen.getByText(/click here to continue/i))
    expect(onContinue).toHaveBeenCalledTimes(1)
  })

  it('does not render a continue link when onContinue is not provided', () => {
    render(<AskTheSage message="Ask away." suggestions={[]} />)
    expect(screen.queryByText(/click here to continue/i)).not.toBeInTheDocument()
  })

  it('calls onOpenChat when the open chat button is clicked', () => {
    const onOpenChat = jest.fn()
    render(<AskTheSage message="Ask away." suggestions={[]} onOpenChat={onOpenChat} />)
    fireEvent.click(screen.getByRole('button', { name: /open chat with the sage/i }))
    expect(onOpenChat).toHaveBeenCalledTimes(1)
  })

  it('supports custom sage name and open chat label', () => {
    render(
      <AskTheSage
        sageName="Old Man Gnome"
        message="Ask away."
        suggestions={[]}
        openChatLabel="Chat with Old Man Gnome"
      />
    )
    expect(screen.getByText('Old Man Gnome')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /chat with old man gnome/i })).toBeInTheDocument()
  })
})
