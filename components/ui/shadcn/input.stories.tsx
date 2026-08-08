import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Input } from './input'

const meta = {
  component: Input,
  tags: ['ai-generated', 'autodocs'],
  args: {
    placeholder: 'Enter your RSN',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves the placeholder renders and the field accepts typed input.
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByPlaceholderText('Enter your RSN')
    await expect(input).toBeVisible()

    await userEvent.type(input, 'Zezima')
    await expect(input).toHaveValue('Zezima')
  },
}

export const Disabled: Story = { args: { disabled: true } }

export const InvalidPassword: Story = {
  args: { type: 'password', 'aria-invalid': true },
}
