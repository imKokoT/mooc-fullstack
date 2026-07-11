
function totalLikes(blogs) {
  return blogs.reduce(
    (sum, blog) => sum + blog.likes,
    0
  )
}

function favoriteBlog(blogs) {
  if (blogs.length === 0)
    return null

  return blogs.reduce((best, blog) =>
    blog.likes > best.likes ? blog : best
  )
}

function mostBlogs(blogs) {
  if (blogs.length === 0)
    return null

  const bloggers = blogs.reduce((bloggers, blog) => {
    if (!bloggers[blog.author])
      bloggers[blog.author] = 0

    bloggers[blog.author] += 1
    return bloggers
  }, {})

  const author = Object.keys(bloggers).reduce(
    (maxKey, key) => bloggers[key] > bloggers[maxKey] ? key : maxKey
  )

  return {
    author: author,
    blogs: bloggers[author]
  }
}

function mostLikes(blogs) {
  if (blogs.length === 0)
    return null

  const bloggers = blogs.reduce((bloggers, blog) => {
    if (!bloggers[blog.author])
      bloggers[blog.author] = 0

    bloggers[blog.author] += blog.likes
    return bloggers
  }, {})

  const author = Object.keys(bloggers).reduce(
    (maxKey, key) => bloggers[key] > bloggers[maxKey] ? key : maxKey
  )

  return {
    author: author,
    likes: bloggers[author]
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
