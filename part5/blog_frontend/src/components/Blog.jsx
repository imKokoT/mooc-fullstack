import { useContext, useState } from 'react'
import AppContext from '../contexts/AppContext'
import BlogService from '../services/blogs'
import UserService from '../services/users'
import './Blog.css'
import LoginContext from '../contexts/LoginContext'

function Blog({ blog }) {
  const { setNotification, setBlogs, blogs } = useContext(AppContext)
  const { user } = useContext(LoginContext)
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

  async function deleteBlog() {
    if(!window.confirm(`A you sure to delete Blog ${blog.title} by ${blog.owner.username}?`))
      return

    function onSuccess() {
      setBlogs(blogs.filter(b => 
        b.id !== blog.id
      ))
      
      setNotification({
        message: 'Blog deleted successfully',
        msgType: 'success',
        timeout: 5
      })
      console.info('deleted blog',blog.id, 'successfully!')
    }
    
    try {
      await BlogService.deleteBlog(blog)

      onSuccess()
    } 
    catch (error) {
      setNotification({
        message: 'Error ' + (error.response.data.error ? error.response.data.error : error.status),
        msgType: 'error'
      })
      console.error('failed to delete blog:', error)
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
        
        {/* show button only if user is owner or admin */}
        {(blog.owner.username === user.username || UserService.isAdmin(user.username)) && (
          <button className='button' onClick={deleteBlog}>Delete</button>
        )}
      </div>
    </div>  
  )
}

export default Blog
