import { useState, useContext } from 'react'
import BlogService from '../services/blogs'
import AppContext from '../contexts/AppContext'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Box, Typography } from '@mui/material'


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
        message: 'Error ' + (error.response ? error.response.data.error : error.status),
        msgType: 'error'
      })
      console.error('failed create new blog')
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
      <Typography variant="h4" sx={{marginTop: 3, marginBottom:3}}>Create new Blog</Typography>

      <form onSubmit={addNewBlog}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingRight: `${(100 - 100 / 3)}%`,
          gap: 1
        }}>
          <TextField label='Title' type="text" onChange={handleTitleChange} value={title}/>
          <TextField label='Url' type="text" onChange={handleUrlChange} value={url}/> 

          <Button sx={{margin:1}} variant='contained' type="submit">Create</Button>
        </Box>
      </form>
    </div>
  )
}

export default NewBlogForm
