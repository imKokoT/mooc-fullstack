import { useState, useContext } from 'react'
import BlogService from '../services/blogs'
import AppContext from '../contexts/AppContext'
import { useNavigate } from 'react-router-dom'


function NewBlogForm({ ref }) {
  const { blogs, setBlogs, setNotification } = useContext(AppContext)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  async function addNewBlog(event) {
    event.preventDefault()

    try {
      const result = await BlogService.createBlog({
        title: title,
        url: url
      })

      onSuccess(result)
    }
    catch (error) {
      setNotification({
        message: 'Error ' + (error.response.data.error ? error.response.data.error : error.status),
        msgType: 'error'
      })
      console.error('failed create new blog:', error.response.data.error)
      return
    }
  }

  function onSuccess(data) {
    setBlogs(blogs.concat(data))

    // cleanup
    setTitle('')
    setUrl('')
    if (ref)
      ref.current.toggleVisibility(false)

    setNotification({
      message: 'Created new Blog successfully!',
      msgType: 'success',
      timeout: 5
    })
    console.log('added new blog', data)

    // would be much better to forward user to new blog
    // directly in order to prevent hiding under blogs 
    // with higher likes
    navigate(`/blogs/${data.id}`)
  }

  const handleTitleChange = event => 
    setTitle(event.target.value)
  const handleUrlChange = event => 
    setUrl(event.target.value)

  return (
    <div>
      <h2>Create new Blog</h2>

      <form onSubmit={addNewBlog}>
        <label>
          Title:
          <input type="text" onChange={handleTitleChange} value={title}/>
        </label> 
        
        <br />
        
        <label>
          Url:
          <input type="text" onChange={handleUrlChange} value={url}/> 
        </label>

        <br />

        <button className='button' type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
