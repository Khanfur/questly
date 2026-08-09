import { expect, test } from '@playwright/test'

test.describe('Style guide', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/style-guide')
  })

  test('renders every documented section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Style Guide', level: 1 })).toBeVisible()

    const sectionTitles = [
      'Typography',
      'Colors',
      'Spacing',
      'Grid',
      'Buttons',
      'Hero CTAs',
      'Badges',
      'Card',
      'Progress',
      'Form Controls',
      'Chathead',
    ]

    for (const title of sectionTitles) {
      await expect(page.getByRole('heading', { name: title })).toBeVisible()
    }
  })

  test('renders button variants', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Default', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Secondary', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Destructive', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Outline', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Link', exact: true })).toBeVisible()
  })

  test('renders quest progress statuses', async ({ page }) => {
    await expect(page.getByText("Cook's Assistant — completed")).toBeVisible()
    await expect(page.getByText('Dragon Slayer II — in-progress')).toBeVisible()
    await expect(page.getByText('Song of the Elves — not-started')).toBeVisible()
  })

  test('allows interacting with form controls', async ({ page }) => {
    const nameInput = page.locator('#sg-input')
    await nameInput.fill('Zezima')
    await expect(nameInput).toHaveValue('Zezima')

    const checkbox = page.getByRole('checkbox', { name: 'Show completed quests' })
    await expect(checkbox).toBeChecked()
    await checkbox.click()
    await expect(checkbox).not.toBeChecked()

    const switchControl = page.getByRole('switch', { name: 'Enable notifications' })
    await expect(switchControl).toBeChecked()
    await switchControl.click()
    await expect(switchControl).not.toBeChecked()

    const f2pRadio = page.getByRole('radio', { name: 'Free-to-play' })
    const memberRadio = page.getByRole('radio', { name: 'Member' })
    await f2pRadio.click()
    await expect(f2pRadio).toBeChecked()
    await expect(memberRadio).not.toBeChecked()
  })

  test('allows choosing a value from the select', async ({ page }) => {
    await page.locator('#sg-select').click()
    await page.getByRole('option', { name: 'Slayer' }).click()
    await expect(page.locator('#sg-select')).toContainText('slayer')
  })
})
