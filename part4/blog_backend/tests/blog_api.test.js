const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const api = supertest(app)
let logins = {}

describe('blog api tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    // create users
    const _users = []
    for (const user of helper.users) {
      _users.push({
        username: user.username,
        password: await bcrypt.hash(user.password, 10)
      })
    }

    const users = await User.insertMany(_users)

    // create blogs
    const blogs = []
    users.forEach((user, i) => {
      helper.users[i].blogs.forEach(blog => {
        blogs.push({
          ...blog,
          owner: user._id
        })
      })
    })

    const savedBlogs = await Blog.insertMany(blogs)

    // fill users.blogs references
    let blogIndex = 0

    for (let i = 0; i < users.length; i++) {
      const count = helper.users[i].blogs.length

      users[i].blogs = savedBlogs
        .slice(blogIndex, blogIndex + count)
        .map(blog => blog._id)

      blogIndex += count

      await users[i].save()
    }

    // login
    for (const _user of helper.users) {
      const username = _user.username
      const user = await User.findOne({ username })

      const userForToken = {
        username: user.username,
        id: user.id,
      }

      const token = jwt.sign(
        userForToken, process.env.SECRET,
        { expiresIn: 60*60 }
      )

      logins[user.username] = token
    }
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
      helper.totalBlogs
    )
  })

  test('test /api/blogs/:id GET format', async () => {
    const atStart = await helper.fetchBlogs({
      created: 1,
      last_login: 1,
      username: 1
    })
    const target = atStart[0]

    const result = await api
      .get(`/api/blogs/${target.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(result.body, target)
  })

  describe('test /api/blogs POST', () => {
    test('no body', async () => {
      const blogsBefore = await helper.fetchBlogs()

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${logins[helper.users[0].username]}`)
        .expect(400)
      
      const blogsAfter = await helper.fetchBlogs()
      assert.strictEqual(blogsBefore.length, blogsAfter.length)
    })

    test('corrupted body', async () => {
      const blogsBefore = await helper.fetchBlogs()
      const corrupted = {}

      await api
        .post('/api/blogs')
        .send(corrupted)
        .set('Authorization', `Bearer ${logins[helper.users[0].username]}`)
        .expect(400)

      const blogsAfter = await helper.fetchBlogs()
      assert.strictEqual(blogsBefore.length, blogsAfter.length)
    })

    test('valid', async () => {
      const content = {
        title: 'title',
        url: 'https://example.com'
      }

      const blogsBefore = await helper.fetchBlogs()

      const result = (await api
        .post('/api/blogs')
        .send(content)
        .set('Authorization', `Bearer ${logins[helper.users[0].username]}`)
        .expect(201)
      ).body

      // is added
      const blogsAfter = await helper.fetchBlogs()
      assert.notStrictEqual(blogsBefore.length, blogsAfter.length)

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

    await api
      .delete(`/api/blogs/${target.id}`)
      .set('Authorization', `Bearer ${logins[helper.users[0].username]}`)
      .expect(204)

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

    await api
      .put(`/api/blogs/${target.id}`)
      .set('Authorization', `Bearer ${logins[helper.users[0].username]}`)
      .send(newContent)
      .expect(200)

    const blogsAfter = await helper.fetchBlogs()
    const updatedTarget = blogsAfter.find(
      blog => blog.id === target.id
    )

    assert.notStrictEqual(target.likes, updatedTarget.likes)
  })

  describe('unauthorized test', () => {
    test('test /api/blogs/ POST', async () => {
      await api
        .post('/api/blogs')
        .expect(401)
    })

    test('test /api/blogs/:id DELETE', async () => {
      const atStart = await helper.fetchBlogs({
        created: 1,
        last_login: 1,
        username: 1
      })
      const target = atStart[0]

      await api
        .delete(`/api/blogs/${target.id}`)
        .expect(401)
    })

    test('test /api/blogs/:id PUT', async () => {
      const atStart = await helper.fetchBlogs({
        created: 1,
        last_login: 1,
        username: 1
      })
      const target = atStart[0]

      await api
        .put(`/api/blogs/${target.id}`)
        .expect(401)
    })
  })
  
  after(async () => {
    await mongoose.connection.close()
  })
})
