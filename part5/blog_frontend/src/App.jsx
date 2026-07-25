import { 
  useState,
  useEffect,
  useContext
} from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Login from './components/Login'
import LoginContext from './contexts/LoginContext'


function TopBar() {
  const {user, setUser} = useContext(LoginContext)

  function handleLogout() {
    window.localStorage.removeItem('user')
    setUser(null)
    console.log('user logout')
  } 

  return (
    <div>
      <div>User {user.username}</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      // related to React's docs if just setState in useEffect 
      // it could affect on performance and also it's not a right 
      // way to set states in effects
      // 
      // i found simple solution by using setTimeout but this 
      // does not look as right way to solve this problem
      setTimeout(() => setUser(user), 300)
      
      blogService.setToken(user.token)
      
      console.log('reused login token from local storage')
    }
  }, [])

  if (!user)
    return (
      <div>
      <LoginContext.Provider value={{user, setUser}}>
        <Login />
      </LoginContext.Provider>
      </div>
    )

  return (
    <div>
    <LoginContext.Provider value={{user, setUser}}>
      <TopBar />

      <h2>Create New Blog</h2>
      <NewBlogForm blogs={blogs} setBlogs={setBlogs} />
      
      <h2>Blogs List</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </LoginContext.Provider>
    </div>
  )
}

export default App
