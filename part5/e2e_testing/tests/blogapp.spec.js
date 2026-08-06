const { test, expect, beforeEach, describe, beforeAll } = require('@playwright/test')
const { exec } = require('node:child_process')
const { title } = require('node:process')


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

  test('Topbar is visible', async ({ page }) => {
    await expect(page.getByRole('link', {name: /blogs/i})).toBeVisible()
    await expect(page.getByRole('link', {name: /login/i})).toBeVisible()
    await expect(page.getByRole('link', {name: /new blog/i})).not.toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('link', {name: /login/i}).click()

      await page.getByLabel(/username/i).fill('user')
      await page.getByLabel(/password/i).fill('password')
      await page.getByRole('button', { name: /login/i }).click()

      await expect(page.getByText(/user user/i)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('link', {name: /login/i}).click()

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
      
      await page.goto('/login')
      
      await page.getByLabel(/username/i).fill('user')
      await page.getByLabel(/password/i).fill('password')
      await page.getByRole('button', { name: /login/i }).click()
      await expect(page.getByText('user user')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      // open form
      await page.getByRole('link', {name: /new blog/i}).click()

      // get elements
      const title = await page.getByLabel(/title/i)
      const url = await page.getByLabel(/url/i)
      const confirm = await page.getByRole('button', {name: /create/i})

      // check they are visible
      await expect(title).toBeVisible()
      await expect(url).toBeVisible()
      await expect(confirm).toBeVisible()

      // create
      await title.fill('title')
      await url.fill('https://example.com')
      await confirm.click()
      
      // check that blog was created
      await expect(page.locator('.success')).toContainText(/created new blog/i)
      await expect(page.getByText(/title/).locator('..')).toContainClass('blog')
    })

    describe('Blogs manipulations', () => {
      async function likeBlog(page, title) {
        // go to blog
        await page.getByRole('link', {name: title}).click()
        const blog = await page.getByText(title).locator('..')

        // like post
        await blog.getByRole('button', {name: /like/i}).click()

        await page.getByRole('link', {name: /blogs/i}).click()
      }
      
      beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset-list', {data:[
          'first', 'second', 'third'
        ]})

        await request.post('/api/testing/add-blog', {data: {
          title: 'first',
          username: 'user'
        }})
        await request.post('/api/testing/add-blog', {data: {
          title: 'second',
          username: 'user'
        }})
        await request.post('/api/testing/add-blog', {data: {
          title: 'third',
          username: 'user'
        }})

        await page.goto('/')
        await expect(page.getByRole('link', {name: /third/})).toBeVisible()
      })

      test('a blog could be liked', async ({page}) => {
        // go to blog
        await page.getByRole('link', {name: 'second'}).click()
        const blog = await page.getByText('second').locator('..')

        // like post
        await blog.getByRole('button', {name: /like/i}).click()

        // check like was increased by 1
        await expect(blog).toHaveText(/likes: 1/i)
      })

      test('only owner see delete button', async ({page}) => {
        // for owned is shown
        await page.getByRole('link', {name: /first/}).click()
        const ownedBlog = await page.getByText(/first/).locator('..')
        await expect(ownedBlog.getByRole('button', {name: /delete/i})).toBeVisible()
    
        // return
        await page.getByRole('link', {name: /blogs/i}).click()

        // for other not
        await page.getByRole('link', {name: /another/}).click()
        const anotherBlog = await page.getByText('another').locator('..')
        await expect(anotherBlog.getByRole('button', {name: /delete/i})).toBeHidden()
      })

      test('delete a blog', async ({page, request}) => {
        // setup confirm listener
        page.once('dialog', dialog => dialog.accept())

        // create and go to blog
        await request.post('/api/testing/add-blog', {data:{
          title: 'to be deleted', username: 'user'
        }})
        await page.goto('/')
        await page.getByRole('link', {name: /to be deleted/}).click()
        const blog = await page.getByText(/to be deleted/)

        // press delete and confirm
        await blog.getByRole('button', {name: /delete/i}).click()
        
        // check
        await expect(await page.getByText(/to be deleted/)).toHaveCount(0)
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
        const items = await (await page.locator('li').allTextContents()).map(item =>
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
