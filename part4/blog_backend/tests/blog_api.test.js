const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
})

describe('blog api tests', () => {
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
})

after(async () => {
  await mongoose.connection.close()
})
