import { 
  useState,
  useEffect,
  useContext,
  useRef
} from 'react'
import AppContext from './contexts/AppContext'
import BlogService from './services/blogs'
import UsersService from './services/users'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Login from './components/Login'
import LoginContext from './contexts/LoginContext'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


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
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef(null)

  // --- cache users ---
  useEffect(() => {
    UsersService.getAll()
  })

  // --- fetch blogs ---
  useEffect(() => {
    BlogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
    .catch(error => {
      setNotification({
        message: `failed to fetch blogs: code ${error.status}`,
        msgType: 'error'
      })
  
      console.error('Failed to fetch blogs:', error.response.data.error)
    })
  }, [])
  
  // --- try to load token ---
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
      setTimeout(() => setUser(user), 0)
      
      BlogService.setToken(user.token)
      
      console.log('reused login token from local storage')
    }
  }, [])

  // --- force login if no user ---
  if (!user)
    return (
      <div>
      <AppContext.Provider value={{setNotification, notification}}>
      <LoginContext.Provider value={{user, setUser}}>

        <Notification />

        <Login />
     
      </LoginContext.Provider>
      </AppContext.Provider>
      </div>
    )

  const displayedBlogs = blogs.sort((a,b) => b.likes - a.likes)

  // --- render main ---
  return (
    <div>
    <AppContext.Provider value={{
      blogs, setBlogs, 
      notification, setNotification
    }}>
    <LoginContext.Provider value={{user, setUser}}>
      
      <TopBar />

      <Notification />

      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <NewBlogForm ref={blogFormRef} />
      </Togglable>
      
      <h2>Blogs List</h2>
      {displayedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    
    </LoginContext.Provider>
    </AppContext.Provider>
    </div>
  )
}

export default App
