import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Badge } from './badge'

const meta = {
  component: Badge,
  tags: ['ai-generated', 'autodocs'],
  args: {
    children: 'Completed',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves the prop value renders as text.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Completed')).toBeVisible()
  },
}

export const Secondary: Story = { args: { variant: 'secondary', children: 'In Progress' } }
export const Muted: Story = { args: { variant: 'muted', children: 'Not Started' } }
export const Destructive: Story = { args: { variant: 'destructive', children: 'Failed' } }
export const Outline: Story = { args: { variant: 'outline', children: 'Draft' } }
