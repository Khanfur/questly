import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { Settings } from 'lucide-react'

import { Button } from './button'

const meta = {
  component: Button,
  tags: ['ai-generated', 'autodocs'],
  args: {
    children: 'Order now',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — one is enough per file.
export const Primary: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /order now/i })).toBeVisible()
  },
}

// CSS check — proves the shared preview loaded the real Tailwind CSS.
// Button's `default` variant uses `bg-primary`, which resolves to
// `--primary: rgb(204, 137, 20)` in app/styles/_variables.css.
export const CssCheck: Story = {
  args: { children: 'Submit' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(204, 137, 20)')
  },
}

export const Outline: Story = { args: { variant: 'outline' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Destructive: Story = { args: { variant: 'destructive' } }
export const Disabled: Story = { args: { disabled: true } }
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Settings />
        Settings
      </>
    ),
  },
}
