import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Switch } from './switch'

const meta = {
  component: Switch,
  tags: ['ai-generated', 'autodocs'],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves clicking the switch toggles its checked state.
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('switch')
    await expect(toggle).toHaveAttribute('aria-checked', 'false')

    await userEvent.click(toggle)

    await expect(toggle).toHaveAttribute('aria-checked', 'true')
  },
}

export const Checked: Story = { args: { defaultChecked: true } }
export const Small: Story = { args: { size: 'sm' } }
export const Disabled: Story = { args: { disabled: true } }
