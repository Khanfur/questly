import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Footer } from './footer'

const meta = {
  component: Footer,
  tags: ['ai-generated', 'autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves the brand name, feature/resource links and the
// disclaimer text all render inside the footer.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Questly')).toBeVisible()
    await expect(canvas.getByRole('link', { name: 'Quests' })).toBeVisible()
    await expect(canvas.getByRole('link', { name: 'Report an issue' })).toBeVisible()
    await expect(
      canvas.getByText(/fan-made companion app and is not affiliated with Jagex/i)
    ).toBeVisible()
  },
}
