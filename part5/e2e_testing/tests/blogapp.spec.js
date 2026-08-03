const { test, expect, beforeEach, describe, beforeAll } = require('@playwright/test')
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

      await expect(page.locator('.success')).toContainText(/created new blog/i)
      await expect(page.getByText(/title by user/i)).toBeVisible()
    })

    describe('Blogs manipulations', () => {
      async function createNewBlog(page, content) {
        // open form
        await page.getByRole('button', {name: /create new blog/i}).click()

        // get elements
        const title = await page.getByLabel(/title/i)
        const url = await page.getByLabel(/url/i)
        const confirm = await page.getByRole('button', {name: /create/i})

        // check that blog was created
        await title.fill(content.title)
        await url.fill(content.url)
        await confirm.click()

        const blog = page.getByText(`${content.title} By`)
        await expect(page.locator('.success')).toContainText(/created new blog/i)
        await expect(blog).toBeVisible()
        
        return blog
      }

      async function likeBlog(page, title) {
        // expand view
        const blog = await page.getByText(title).locator('..')
        const viewButton = blog.getByRole('button', { name: /view/i })

        if (await viewButton.count())
          await viewButton.click()

        // like post
        await blog.getByRole('button', {name: /like/i}).click()
      }
      
      beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset-list', {data:[
          'first', 'second', 'third'
        ]})

        await createNewBlog(page, {
          title: 'first', url: 'https://example.com'
        })
        await createNewBlog(page, {
          title: 'second', url: 'https://example.com'
        })
        await createNewBlog(page, {
          title: 'third', url: 'https://example.com'
        })
      })

      test('a blog could be liked', async ({page}) => {
        // expand view
        const blog = await page.getByText('second').locator('..')
        await blog.getByRole('button', {name: /view/i}).click()

        // like post
        await blog.getByRole('button', {name: /like/i}).click()

        // check like was increased by 1
        await expect(blog).toHaveText(/likes: 1/i)
      })

      test('only owner see delete button', async ({page}) => {
        // for owned is shown
        const ownedBlog = await page.getByText('first').locator('..')
        await ownedBlog.getByRole('button', {name: /view/i}).click()
        await expect(ownedBlog.getByRole('button', {name: /delete/i})).toBeVisible()

        // for other not
        const anotherBlog = await page.getByText('another').locator('..')
        await anotherBlog.getByRole('button', {name: /view/i}).click()
        await expect(anotherBlog.getByRole('button', {name: /delete/i})).toBeHidden()
      })

      test('delete a blog', async ({page}) => {
        // setup confirm listener
        page.once('dialog', dialog => dialog.accept())

        // create and expand view
        let blog = await createNewBlog(page, {
          title: 'to be deleted', url: 'https://example.com'
        })
        blog = await blog.locator('..')
        await blog.getByRole('button', {name: /view/i}).click()

        // press delete and confirm
        await blog.getByRole('button', {name: /delete/i}).click()
        
        // check
        await expect(blog).toHaveCount(0)
      })

      test('test blogs ordering', async ({page}) => {    
        // like blogs
        await likeBlog(page, 'second')
        await likeBlog(page, 'second')
        await likeBlog(page, 'second')
        await likeBlog(page, 'second')
        
        await likeBlog(page, 'another')
        await likeBlog(page, 'another')
        await likeBlog(page, 'another')
        
        await likeBlog(page, 'third')
        await likeBlog(page, 'third')
        
        await page.waitForTimeout(1000)
        
        // take only title
        const items = await (await page.locator('.blog').allTextContents()).map(item =>
          item.split(' ', 1)[0]
        )

        expect(items).toEqual([
          'second',
          'another',
          'third',
          'first',
        ])
      })
    })
  })
})
