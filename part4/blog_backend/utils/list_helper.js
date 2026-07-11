
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

module.exports = {
  totalLikes,
  favoriteBlog
}
