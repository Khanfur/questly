import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'

const meta = {
  component: Select,
  tags: ['ai-generated', 'autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves the placeholder renders, opening the select reveals
// its options, and picking one updates the trigger's displayed label.
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-label="Skill">
        <SelectValue placeholder="Select a skill" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="attack">Attack</SelectItem>
        <SelectItem value="strength">Strength</SelectItem>
        <SelectItem value="defence">Defence</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('combobox')
    await expect(trigger).toHaveTextContent('Select a skill')

    await userEvent.click(trigger)

    // The listbox is portaled to document.body, so it must be queried
    // outside of `canvas`.
    const body = within(trigger.ownerDocument.body)
    const strengthOption = await body.findByRole('option', { name: 'Strength' })
    await userEvent.click(strengthOption)

    await expect(trigger).toHaveTextContent(/strength/i)
  },
}
