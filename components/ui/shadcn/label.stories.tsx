import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Label } from './label'
import { Input } from './input'

const meta = {
  component: Label,
  tags: ['ai-generated', 'autodocs'],
  args: {
    children: 'Username',
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves the label text renders.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Username')).toBeVisible()
  },
}

// Smoke check — proves clicking the label focuses the associated input via `htmlFor`.
export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="username">Username</Label>
      <Input id="username" />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const label = canvas.getByText('Username')
    const input = canvas.getByRole('textbox')

    await userEvent.click(label)

    await expect(input).toHaveFocus()
  },
}
