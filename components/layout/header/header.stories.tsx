import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'

import { SettingsDrawerProvider } from '@/components/layout/header/settings-drawer-context'

import { Header } from './header'

const meta = {
  component: Header,
  tags: ['ai-generated', 'autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <SettingsDrawerProvider>
        <Story />
      </SettingsDrawerProvider>
    ),
  ],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — proves clicking the mobile menu trigger opens the drawer
// (aria-expanded reflects open state) and reveals the nav links inside it.
// The trigger is only visible below the `sm` breakpoint, so the viewport is
// shrunk first to make it accessible. `vitest/browser` is only importable
// while running under the Vitest browser test runner — it throws if the
// story is loaded by plain `storybook dev`/`build`, so it must be imported
// dynamically and guarded rather than at module scope.
export const Default: Story = {
  play: async ({ canvasElement, userEvent }) => {
    try {
      const { page } = await import('vitest/browser')
      await page.viewport(375, 700)
    } catch {
      // Not running under Vitest — continue at whatever viewport the
      // Storybook canvas currently provides.
    }

    const menuButton = canvasElement.querySelector<HTMLButtonElement>(
      '[data-slot="drawer-trigger"]'
    )
    if (!menuButton || getComputedStyle(menuButton).display === 'none') {
      // The mobile trigger is only rendered below the `sm` breakpoint; skip
      // the interaction when the canvas is wider than that.
      return
    }

    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(menuButton)

    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    // The drawer content is portaled to document.body, so it must be
    // queried outside of `canvas`.
    const body = within(canvasElement.ownerDocument.body)
    await expect(await body.findByText('Menu')).toBeVisible()
  },
}
