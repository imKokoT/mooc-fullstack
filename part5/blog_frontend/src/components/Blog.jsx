import { useContext } from 'react'
import AppContext from '../contexts/AppContext'
import BlogService from '../services/blogs'
import UserService from '../services/users'
import './Blog.css'
import LoginContext from '../contexts/LoginContext'
import { useNavigate } from 'react-router-dom'

function Blog({ blog }) {
  const { setNotification, setBlogs, blogs } = useContext(AppContext)
  const { user } = useContext(LoginContext)
  const navigate = useNavigate()

  if (!blog)
    return

  async function likeBlog() {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      await BlogService.likeBlog(newBlog)

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
    if(!window.confirm(`Are you sure to delete Blog ${blog.title} by ${blog.owner.username}?`))
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
      navigate('/')
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
      <div>
        {blog.title} 
        <br />

        {blog.url} <br /> 

        likes: {blog.likes}
        {user ?
          <button className='button' onClick={likeBlog}>like</button>
          : null
        }
        <br />
        
        By {blog.owner.username} <br />
        
        {/* show button only if user is owner or admin */}
        {user ? 
          (blog.owner.username === user.username || UserService.isAdmin(user.username)) && (
            <button className='button' onClick={deleteBlog}>Delete</button>
          ) 
          : null
        }
      </div>
    </div>  
  )
}

export default Blog
