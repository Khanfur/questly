import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { ChatMessage } from './chat-message'

const meta = {
  component: ChatMessage,
  tags: ['ai-generated', 'autodocs'],
  args: {
    message: { id: '1', role: 'sage', text: 'Ask me anything — task advice, quest order, gear.' },
  },
} satisfies Meta<typeof ChatMessage>

export default meta
type Story = StoryObj<typeof meta>

export const SageMessage: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('The Sage')).toBeVisible()
  },
}

export const UserMessage: Story = {
  args: {
    message: { id: '2', role: 'user', text: 'What should I do next for quest points?' },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('You')).toBeVisible()
  },
}
