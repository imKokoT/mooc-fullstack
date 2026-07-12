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

  test.only('test /api/blogs/:id GET format', async () => {
    const atStart = await helper.blogsInDb()
    const target = atStart[0]

    const result = await api
      .get(`/api/blogs/${target.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(result.body, target)
  })
})

after(async () => {
  await mongoose.connection.close()
})
