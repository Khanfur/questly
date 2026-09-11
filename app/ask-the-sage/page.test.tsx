import AskTheSagePage from '@/app/ask-the-sage/page'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

describe('AskTheSagePage', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: 'The Sage says the path is clear.' }),
    }) as jest.Mock
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("renders the hero and the Sage's opening greeting", () => {
    render(<AskTheSagePage />)
    expect(screen.getByRole('heading', { name: 'Wisdom, on tap.' })).toBeInTheDocument()
    expect(screen.getByText(/Back again\? Ask me anything/i)).toBeInTheDocument()
  })

  it('sends the selected suggestion to the Sage API and renders the reply', async () => {
    render(<AskTheSagePage />)
    fireEvent.click(screen.getByRole('button', { name: 'Just here to chat.' }))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/sage',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ message: 'Just here to chat.' }),
        })
      )
    })

    await waitFor(() => {
      expect(screen.getAllByText('Just here to chat.').length).toBeGreaterThan(0)
      expect(screen.getByText('The Sage says the path is clear.')).toBeInTheDocument()
    })
  })

  it('sends a typed message and renders Claude-backed reply', async () => {
    render(<AskTheSagePage />)
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'What is the meaning of life?' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))

    await waitFor(() => {
      expect(screen.getByText('What is the meaning of life?')).toBeInTheDocument()
      expect(screen.getByText('The Sage says the path is clear.')).toBeInTheDocument()
    })
    expect(screen.getByLabelText('Message')).toHaveValue('')
  })
})
