import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Checkbox } from './checkbox'

const meta = {
  component: Checkbox,
  tags: ['ai-generated', 'autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves clicking the checkbox toggles its checked state.
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole('checkbox')
    await expect(checkbox).toHaveAttribute('aria-checked', 'false')

    await userEvent.click(checkbox)

    await expect(checkbox).toHaveAttribute('aria-checked', 'true')
  },
}

export const Checked: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
