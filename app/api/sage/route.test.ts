/**
 * @jest-environment node
 */
import { POST } from '@/app/api/sage/route'
import { SAGE_SYSTEM_PROMPT } from '@/lib/ai/sage-prompt'

describe('POST /api/sage', () => {
  afterEach(() => {
    delete process.env.ANTHROPIC_API_KEY
    jest.restoreAllMocks()
  })

  it('returns a fallback reply when the Anthropic API key is missing', async () => {
    const request = new Request('http://localhost/api/sage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello there' }),
    })

    const response = await POST(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.source).toBe('fallback')
    expect(body.reply).toEqual(expect.any(String))
    expect(body.error).toBe('Missing ANTHROPIC_API_KEY')
  })

  it('exports the Sage persona prompt separately', () => {
    expect(SAGE_SYSTEM_PROMPT).toContain('ancient wandering guide from Gielinor')
    expect(SAGE_SYSTEM_PROMPT).toContain('Never mention being an AI')
  })

  it('proxies a Claude response when the API key is configured', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key'
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        content: [{ type: 'text', text: 'A very wise answer from Claude.' }],
      }),
    }) as jest.Mock

    const request = new Request('http://localhost/api/sage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'What should I do next?' }),
    })

    const response = await POST(request)

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.anthropic.com/v1/messages',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'x-api-key': 'test-key',
          'anthropic-version': '2023-06-01',
        }),
      })
    )
    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body).toEqual({ reply: 'A very wise answer from Claude.', source: 'claude' })
  })
})
