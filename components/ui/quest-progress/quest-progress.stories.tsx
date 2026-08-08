import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { QuestProgress } from './quest-progress'

const meta = {
  component: QuestProgress,
  tags: ['ai-generated', 'autodocs'],
  args: {
    questName: 'Dragon Slayer II',
    status: 'in-progress',
  },
} satisfies Meta<typeof QuestProgress>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves the quest name and status label render together,
// and that the progress value is derived correctly from `status`.
export const InProgress: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Dragon Slayer II — in-progress/i)).toBeVisible()
    await expect(canvas.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50')
  },
}

export const Completed: Story = { args: { status: 'completed', questName: "Cook's Assistant" } }
export const NotStarted: Story = { args: { status: 'not-started', questName: 'Recipe for Disaster' } }
