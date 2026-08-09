import { expect, test } from '@playwright/test'

test.describe('Site layout', () => {
  test('renders header with logo and desktop navigation', async ({ page }) => {
    await page.goto('/')

    const header = page.locator('header')
    await expect(header).toBeVisible()
    await expect(header.getByRole('link', { name: 'Questly' })).toBeVisible()

    const nav = header.getByRole('navigation')
    await expect(nav.getByRole('link', { name: 'Stats' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Quests' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Ask the Sage' })).toBeVisible()
  })

  test('renders footer with feature and resource links', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Stats' })).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Quests' })).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Ask the Sage' })).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Report an issue' })).toHaveAttribute(
      'href',
      'https://github.com/Khanfur/questly/issues'
    )
  })

  test('highlights the active nav link', async ({ page }) => {
    await page.goto('/')

    const header = page.locator('header')
    await expect(header.getByRole('link', { name: 'Stats' })).toHaveClass(/bg-muted/)
    await expect(header.getByRole('link', { name: 'Quests' })).not.toHaveClass(/bg-muted/)
  })
})

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 375, height: 800 } })

  test('opens and closes the mobile drawer menu', async ({ page }) => {
    await page.goto('/')

    const openButton = page.getByRole('button', { name: 'Open menu' })
    await expect(openButton).toBeVisible()
    await openButton.click()

    const drawer = page.getByLabel('Mobile navigation')
    await expect(drawer).toBeVisible()
    await expect(drawer.getByRole('link', { name: 'Stats' })).toBeVisible()
    await expect(drawer.getByRole('link', { name: 'Quests' })).toBeVisible()

    await page.getByRole('button', { name: 'Close menu' }).click()
    await expect(drawer).toBeHidden()
  })

  test('closes the drawer after selecting a nav link', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Open menu' }).click()
    const drawer = page.getByLabel('Mobile navigation')
    await expect(drawer).toBeVisible()

    await drawer.getByRole('link', { name: 'Stats' }).click()
    await expect(drawer).toBeHidden()
  })
})
