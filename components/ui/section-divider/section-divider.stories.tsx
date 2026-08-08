import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SectionDivider } from './section-divider'

const meta = {
  component: SectionDivider,
  tags: ['ai-generated', 'autodocs'],
} satisfies Meta<typeof SectionDivider>

export default meta
type Story = StoryObj<typeof meta>

// Purely decorative — no interactive behavior or dynamic content to assert.
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <SectionDivider />
    </div>
  ),
}
