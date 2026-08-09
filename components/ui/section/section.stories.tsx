import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Badge } from '@/components/ui/shadcn/badge'

import { Section } from './section'

const meta = {
  component: Section,
  tags: ['ai-generated', 'autodocs'],
  args: {
    title: 'Skills',
  },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves the `title` prop renders as a heading.
export const Default: Story = {
  args: {
    children: (
      <>
        <Badge>Attack</Badge>
        <Badge variant="secondary">Strength</Badge>
        <Badge variant="muted">Defence</Badge>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Skills' })).toBeVisible()
  },
}
