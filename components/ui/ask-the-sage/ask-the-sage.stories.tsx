import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn } from 'storybook/test'

import { sageSuggestions } from '@/lib/fixtures'
import { AskTheSage } from './ask-the-sage'

const meta = {
  component: AskTheSage,
  tags: ['ai-generated', 'autodocs'],
  args: {
    message:
      "Back again? Your Slayer's crept to 71 but you're still avoiding Vannaka. Ask me anything — task advice, quest order, gear upgrades. I won't judge. Much.",
    suggestions: sageSuggestions,
    onContinue: fn(),
    onSelectSuggestion: fn(),
    onOpenChat: fn(),
  },
} satisfies Meta<typeof AskTheSage>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — message, suggestions and the open-chat CTA all render.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Ask the Sage')).toBeVisible()
    await expect(canvas.getByText('Just here to chat.')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /open chat with the sage/i })).toBeVisible()
  },
}

export const NoSuggestions: Story = {
  args: { suggestions: [] },
}

export const CustomSage: Story = {
  args: {
    sageName: 'Old Man Gnome',
    message: 'Need a hand with the Gnome Stronghold agility course?',
    openChatLabel: 'Chat with Old Man Gnome',
  },
}
