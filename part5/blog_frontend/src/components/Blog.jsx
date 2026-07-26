import { useState } from 'react'
import './Blog.css'

function Blog({ blog }) {
  const [showDetails, setShowDetails] = useState(false)
  
  const hideWhenVisible = { display: showDetails ? 'none' : '' }
  const showWhenVisible = { display: showDetails ? '' : 'none' }

  function switchDetails() {
    setShowDetails(!showDetails)
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
        <button className='button'>like</button>
        <br />
        
        By {blog.owner.username} <br />
      </div>
    </div>  
  )
}

export default Blog
