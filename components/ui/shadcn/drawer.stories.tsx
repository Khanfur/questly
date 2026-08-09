import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'

import { Button } from './button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer'

const meta = {
  component: Drawer,
  tags: ['ai-generated', 'autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves clicking the trigger opens the drawer (aria-expanded
// reflects open state) and reveals its title/description, and that the
// close button dismisses it again. The popup is portaled to document.body,
// so it must be queried outside of `canvas`.
export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger render={<Button>Open drawer</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Adventurer's Log</DrawerTitle>
          <DrawerDescription>Review your latest quest progress.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  play: async ({ canvasElement, canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Open drawer' })
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')

    const body = within(canvasElement.ownerDocument.body)
    await expect(await body.findByText("Adventurer's Log")).toBeVisible()

    const closeButton = await body.findByRole('button', { name: 'Close' })
    await userEvent.click(closeButton)

    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  },
}
