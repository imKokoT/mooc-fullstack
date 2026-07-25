import { useState } from 'react'
import BlogService from '../services/blogs'


function NewBlogForm({ blogs, setBlogs }) {
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
      console.error('failed create new blog:', error.response.data.error)
      return
    }
  }

  function onSuccess(data) {
    setBlogs(blogs.concat(data))
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
