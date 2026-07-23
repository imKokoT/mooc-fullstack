const Blog = require('../models/blog')
const User = require('../models/user')

const totalBlogs = 6
const users = [
  {
    username: 'Michael Chan',
    password: 'abc',
    blogs: [
      { 
        title: 'React patterns',
        url: 'https://reactpatterns.com/',
        likes: 7,
      },
    ]
  },
  {
    username: 'Edsger W. Dijkstra',
    password: 'cba',
    blogs: [
      { 
        title: 'Go To Statement Considered Harmful',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      },
      { 
        title: 'Canonical string reduction',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      },
    ]
  },
  {
    username: 'Robert C. Martin',
    password: '123',
    blogs: [
      {
        title: 'First class tests',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
      },
      { 
        title: 'TDD harms architecture',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
      },
      {
        title: 'Type wars',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
      }
    ]
  }
]

async function fetchBlogs(filter = {}) {
  const _blogs = await Blog.find({}).populate('owner', filter)
  return JSON.parse(JSON.stringify(_blogs))
}

async function fetchUsers(filter = {}) {
  const users = await User.find({}).populate('blogs', filter)
  return JSON.parse(JSON.stringify(users))
}

module.exports = {
  users,
  totalBlogs,
  fetchBlogs,
  fetchUsers
}
