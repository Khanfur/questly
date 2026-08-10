import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Container } from './container'

const meta = {
  component: Container,
  tags: ['ai-generated', 'autodocs'],
  args: {
    children: <p>Container content</p>,
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves children render and the max-width/centering classes
// are applied to the wrapping div.
export const Default: Story = {
  play: async ({ canvas }) => {
    const content = await canvas.findByText('Container content')
    await expect(content).toBeVisible()

    const wrapper = content.parentElement
    await expect(wrapper).toHaveClass('mx-auto', 'w-full', 'max-w-7xl')
  },
}

// Smoke check — proves a custom `className` is merged onto the wrapper
// alongside the default layout classes.
export const CustomClassName: Story = {
  args: {
    className: 'bg-muted',
    children: <p>Custom class content</p>,
  },
  play: async ({ canvas }) => {
    const content = await canvas.findByText('Custom class content')
    const wrapper = content.parentElement
    await expect(wrapper).toHaveClass('bg-muted', 'mx-auto')
  },
}
