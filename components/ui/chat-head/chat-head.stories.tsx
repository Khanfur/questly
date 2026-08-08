import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { ChatHead } from './chat-head'

const meta = {
  component: ChatHead,
  tags: ['ai-generated', 'autodocs'],
  args: {
    avatar: '',
    fallbackAvatar: 'JS',
    status: 'online',
  },
} satisfies Meta<typeof ChatHead>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — the fallback avatar text renders when the image is empty.
export const Online: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('JS')).toBeVisible()
  },
}

export const Away: Story = { args: { status: 'away' } }
export const Offline: Story = { args: { status: 'offline' } }
