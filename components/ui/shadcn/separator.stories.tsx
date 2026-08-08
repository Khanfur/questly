import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Separator } from './separator'

const meta = {
  component: Separator,
  tags: ['ai-generated', 'autodocs'],
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves the default horizontal separator renders with the
// expected orientation attribute.
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Separator data-testid="separator" />
    </div>
  ),
  play: async ({ canvas }) => {
    const separator = canvas.getByTestId('separator')
    await expect(separator).toHaveAttribute('data-orientation', 'horizontal')
  },
}

// Smoke check — proves the vertical orientation is applied correctly.
export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center gap-4">
      <span>Left</span>
      <Separator orientation="vertical" data-testid="separator" />
      <span>Right</span>
    </div>
  ),
  play: async ({ canvas }) => {
    const separator = canvas.getByTestId('separator')
    await expect(separator).toHaveAttribute('data-orientation', 'vertical')
  },
}
