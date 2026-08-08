import { test, expect } from '@playwright/test'

test('home page loads with the site layout', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Questly')
  await expect(page.locator('header')).toBeVisible()
  await expect(page.locator('footer')).toBeVisible()
})
