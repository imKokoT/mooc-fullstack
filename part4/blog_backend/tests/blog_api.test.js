const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe.only('blog api tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const _users = []
    helper.users.forEach(async (user) => {
      _users.push({
        username: user.username,
        password: await bcrypt.hash(user.password, 10)
      })
    })
    
    const users = await User.insertMany(_users)

    const blogs = users.flatMap((user, i) =>
      helper.users[i].blogs.map(blog => ({
        ...blog,
        owner: user._id
      }))
    )

    await Blog.insertMany(blogs)
  })

  test('test /api/blogs is JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('test /api/blogs GET returns same length as init', async () => {
    const response = await api.get('/api/blogs')
    
    assert.strictEqual(
      response.body.length, 
      helper.blogs.length
    )
  })

  test('test /api/blogs/:id GET format', async () => {
    const atStart = await helper.fetchBlogs()
    const target = atStart[0]

    const result = await api
      .get(`/api/blogs/${target.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(result.body, target)
  })

  describe('test /api/blogs POST', () => {
    test('no body', async () => {
      await api.post('/api/blogs').expect(400)
      
      const blogsAfter = await helper.fetchBlogs()
      assert.strictEqual(helper.blogs.length, blogsAfter.length)
    })

    test('corrupted body', async () => {
      const corrupted = {}

      await api.post('/api/blogs').send(corrupted).expect(400)

      const blogsAfter = await helper.fetchBlogs()
      assert.strictEqual(helper.blogs.length, blogsAfter.length)
    })

    test('valid', async () => {
      const content = {
        title: 'title',
        author: 'author',
        url: 'https://example.com'
      }

      const result = (await api.post('/api/blogs').send(content).expect(201)).body

      // is added
      const blogsAfter = await helper.fetchBlogs()
      assert.notStrictEqual(helper.blogs.length, blogsAfter.length)

      console.log(result)
      // validate keys
      Object.keys(content).forEach(k => {
        assert.strictEqual(result[k], content[k])
      })

      // likes is default 0
      assert.strictEqual(result.likes, 0)
    })
  })

  test('test /api/blogs/:id DELETE', async () => {
    const atStart = await helper.fetchBlogs()
    const target = atStart[0]

    await api.delete(`/api/blogs/${target.id}`).expect(204)

    const blogsAfter = await helper.fetchBlogs()
    assert.strictEqual(
      blogsAfter.length,
      atStart.length - 1
    )
  })

  test('test /api/blogs/:id PUT', async () => {
    const atStart = await helper.fetchBlogs()
    const target = atStart[0]
    const newContent = {...target}
    newContent.likes += 1

    await api.put(`/api/blogs/${target.id}`).send(newContent).expect(200)

    const blogsAfter = await helper.fetchBlogs()
    const updatedTarget = blogsAfter.find(
      blog => blog.id === target.id
    )

    assert.notStrictEqual(target.likes, updatedTarget.likes)
  })
  
  after(async () => {
    await mongoose.connection.close()
  })
})
