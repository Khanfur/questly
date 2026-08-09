import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Label } from './label'
import { RadioGroup, RadioGroupItem } from './radio-group'

const meta = {
  component: RadioGroup,
  tags: ['ai-generated', 'autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves selecting a radio item marks it checked and the
// previously checked sibling unchecked.
export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="normal" aria-label="Game mode">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="normal" id="normal" />
        <Label htmlFor="normal">Normal</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="ironman" id="ironman" />
        <Label htmlFor="ironman">Ironman</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const normal = canvas.getByRole('radio', { name: 'Normal' })
    const ironman = canvas.getByRole('radio', { name: 'Ironman' })

    await expect(normal).toHaveAttribute('aria-checked', 'true')
    await expect(ironman).toHaveAttribute('aria-checked', 'false')

    await userEvent.click(ironman)

    await expect(ironman).toHaveAttribute('aria-checked', 'true')
    await expect(normal).toHaveAttribute('aria-checked', 'false')
  },
}
