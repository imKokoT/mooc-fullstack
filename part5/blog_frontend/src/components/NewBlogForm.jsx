import { useState, useContext } from 'react'
import BlogService from '../services/blogs'
import AppContext from '../contexts/AppContext'


function NewBlogForm({ blogs, setBlogs }) {
  const { setNotification } = useContext(AppContext)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

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
        message: error.response.data.error,
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

    setNotification({
      message: 'Created new Blog successfully!',
      msgType: 'success'
    })
    console.log('added new blog', data)
  }

  const handleTitleChange = event => 
    setTitle(event.target.value)
  const handleUrlChange = event => 
    setUrl(event.target.value)

  return (
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

      <button className='button' type="submit">Crete</button>
    </form>
  )
}

export default NewBlogForm
