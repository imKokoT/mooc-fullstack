const { test, expect, beforeEach, describe } = require('@playwright/test')


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    const user = {
      username: 'user',
      password: 'password'
    }
    await request.post('/api/testing/reset')
    await request.post('/api/signup', {data: user})

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel(/username/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel(/username/i).fill('user')
      await page.getByLabel(/password/i).fill('password')
      await page.getByRole('button', { name: /login/i }).click()

      await expect(page.getByText(/user user/i)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel(/username/i).fill('user')
      await page.getByLabel(/password/i).fill('wrong-password')
      await page.getByRole('button', { name: /login/i }).click()

      await expect(page.locator('.error')).toContainText(/invalid username or password/i)
    })
  })
})
