import { 
  useState,
  useEffect
} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import LoginContext from './contexts/LoginContext'


function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  

  return (
    <div>
    <LoginContext.Provider value={{user, setUser}}>
      <Login />

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </LoginContext.Provider>
    </div>
  )
}

export default App
