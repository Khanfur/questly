import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Button } from './button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'

const meta = {
  component: Card,
  tags: ['ai-generated', 'autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves title and description text render inside the composed card.
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Dragon Slayer II</CardTitle>
        <CardDescription>A grandmaster quest for the true adventurer.</CardDescription>
        <CardAction>
          <Button size="sm">Start</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Requires 200 Quest Points and access to Bolrie's ship.</p>
      </CardContent>
      <CardFooter>
        <span className="label">Grandmaster</span>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Dragon Slayer II')).toBeVisible()
    await expect(canvas.getByText(/grandmaster quest/i)).toBeVisible()
  },
}

export const Small: Story = {
  render: () => (
    <Card size="sm" className="w-80">
      <CardHeader>
        <CardTitle>Cook's Assistant</CardTitle>
        <CardDescription>A short novice-level quest.</CardDescription>
      </CardHeader>
    </Card>
  ),
}
