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
      'Stat card',
      'Quest Difficulty Badge',
      'Quest Status Icon',
      'Quest List Item',
      'Quest Tier Group',
      'Diary Tier Card',
      'Diary Region Card',
      'Filter Pill Group',
      'View Toggle',
      'Page Hero',
    ]

    for (const title of sectionTitles) {
      await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible()
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

  test('renders quest list items covering every status', async ({ page }) => {
    await expect(page.getByText('Monkey Madness I, Client of Kourend')).toBeVisible()
    await expect(page.getByText('A Taste of Hope, Vampyre Slayer')).toBeVisible()
    await expect(page.getByText('Level 200 Quest Points, several skills 50-75')).toBeVisible()
    await expect(page.getByText(/Last one on the list\. No pressure\./)).toBeVisible()
  })

  test('renders diary tier cards covering every status', async ({ page }) => {
    await expect(page.getByText('5 / 5 tasks')).toBeVisible()
    await expect(page.getByText('8 / 12 tasks')).toBeVisible()
    await expect(page.getByText('0 / 9 tasks')).toBeVisible()
    await expect(page.getByText('0 / 7 tasks')).toBeVisible()
  })

  test('highlights the matching item in the view toggle', async ({ page }) => {
    const toggles = page.getByRole('link', { name: 'Quest Log' })
    await expect(toggles.first()).toHaveAttribute('aria-current', 'page')
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
