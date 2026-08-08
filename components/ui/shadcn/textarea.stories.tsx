import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Textarea } from './textarea'

const meta = {
  component: Textarea,
  tags: ['ai-generated', 'autodocs'],
  args: {
    placeholder: 'Write your diary entry...',
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves the placeholder renders and the field accepts typed input.
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByPlaceholderText('Write your diary entry...')
    await expect(textarea).toBeVisible()

    await userEvent.type(textarea, 'Slayed the dragon today.')
    await expect(textarea).toHaveValue('Slayed the dragon today.')
  },
}

export const Disabled: Story = { args: { disabled: true } }
