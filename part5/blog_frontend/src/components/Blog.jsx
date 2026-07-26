import { useContext, useState } from 'react'
import AppContext from '../contexts/AppContext'
import BlogService from '../services/blogs'
import './Blog.css'

function Blog({ blog }) {
  const { setNotification, setBlogs, blogs } = useContext(AppContext)
  const [showDetails, setShowDetails] = useState(false)
  
  const hideWhenVisible = { display: showDetails ? 'none' : '' }
  const showWhenVisible = { display: showDetails ? '' : 'none' }

  function switchDetails() {
    setShowDetails(!showDetails)
  }

  async function likeBlog() {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      await BlogService.updateBlog(newBlog)

      setBlogs(blogs.map(b => 
        b.id === newBlog.id ? newBlog : b
      ))
      console.info(`liked blog ${blog.id}`)
    }
    catch (error) {
      setNotification({
        message: 'An error occurred while like the Blog: ' + error.status,
        msgType: 'error',
        timeout: 5
      })
      console.error('failed update blog', error.response.data.error)
    }
  }

  return (
    <div className="blog">
      {/* shorten view */}
      <div style={hideWhenVisible}>
        {blog.title} By {blog.owner.username}
        <button className='button' onClick={switchDetails}>View</button>
      </div>

      {/* expanded view */}
      <div style={showWhenVisible}>
        {blog.title} 
        <button className='button' onClick={switchDetails}>Hide</button>
        <br />

        {blog.url} <br /> 

        likes: {blog.likes}
        <button className='button' onClick={likeBlog}>like</button>
        <br />
        
        By {blog.owner.username} <br />
      </div>
    </div>  
  )
}

export default Blog
