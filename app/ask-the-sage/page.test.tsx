import AskTheSagePage from '@/app/ask-the-sage/page'
import { fireEvent, render, screen } from '@testing-library/react'

describe('AskTheSagePage', () => {
  it("renders the hero and the Sage's opening greeting", () => {
    render(<AskTheSagePage />)
    expect(screen.getByRole('heading', { name: 'Wisdom, on tap.' })).toBeInTheDocument()
    expect(screen.getByText(/Back again\? Ask me anything/i)).toBeInTheDocument()
  })

  it('replies with a canned response when a suggestion is clicked', () => {
    render(<AskTheSagePage />)
    fireEvent.click(screen.getByRole('button', { name: 'Just here to chat.' }))

    expect(screen.getAllByText('Just here to chat.').length).toBeGreaterThan(0)
    expect(screen.getByText(/even the Wise Old Man's run out of gossip/i)).toBeInTheDocument()
  })

  it('sends a typed message and replies with a fallback response', () => {
    render(<AskTheSagePage />)
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'What is the meaning of life?' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))

    expect(screen.getByText('What is the meaning of life?')).toBeInTheDocument()
    expect(screen.getByText(/above my pay grade/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toHaveValue('')
  })
})
