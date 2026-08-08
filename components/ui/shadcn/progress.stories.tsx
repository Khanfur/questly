import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Progress } from './progress'

const meta = {
  component: Progress,
  tags: ['ai-generated', 'autodocs'],
  args: {
    value: 50,
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves the progressbar reflects the `value` prop via aria-valuenow.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50')
  },
}

export const Empty: Story = { args: { value: 0 } }
export const Complete: Story = { args: { value: 100 } }
export const Secondary: Story = { args: { value: 75, variant: 'secondary' } }
export const Muted: Story = { args: { value: 30, variant: 'muted' } }
