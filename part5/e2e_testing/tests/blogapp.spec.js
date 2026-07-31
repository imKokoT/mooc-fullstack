const { test, expect, beforeEach, describe } = require('@playwright/test')
const { exec } = require('node:child_process')


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

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      const user = {
        username: 'user',
        password: 'password'
      }
      await request.post('/api/testing/reset')
      await request.post('/api/signup', {data: user})
      
      await page.goto('/')
      
      await page.getByLabel(/username/i).fill('user')
      await page.getByLabel(/password/i).fill('password')
      await page.getByRole('button', { name: /login/i }).click()
      await expect(page.getByText('user user')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      // open form
      await page.getByRole('button', {name: /create new blog/i}).click()

      // get elements
      const title = await page.getByLabel(/title/i)
      const url = await page.getByLabel(/url/i)
      const confirm = await page.getByRole('button', {name: /create/i})

      // check they are visible
      await expect(title).toBeVisible()
      await expect(url).toBeVisible()
      await expect(confirm).toBeVisible()

      // check that blog was created
      await title.fill('title')
      await url.fill('https://example.com')
      await confirm.click()

      await page.pause()
      await expect(page.locator('.success')).toContainText(/created new blog/i)
      await expect(page.getByText(/title by user/i)).toBeVisible()
    })
  })
})
