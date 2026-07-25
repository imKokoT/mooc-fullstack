import { 
  useState,
  useEffect,
  useContext
} from 'react'
import AppContext from './contexts/AppContext'
import BlogService from './services/blogs'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Login from './components/Login'
import LoginContext from './contexts/LoginContext'
import Notification from './components/Notification'


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

  useEffect(() => {
    BlogService.getAll().then(blogs =>
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
      
      BlogService.setToken(user.token)
      
      console.log('reused login token from local storage')
    }
  }, [])

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

  return (
    <div>
    <AppContext.Provider value={{
      blogs, setBlogs, 
      notification, setNotification
    }}>
    <LoginContext.Provider value={{user, setUser}}>
      
      <TopBar />

      <Notification />

      <h2>Create New Blog</h2>
      <NewBlogForm blogs={blogs} setBlogs={setBlogs} />
      
      <h2>Blogs List</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    
    </LoginContext.Provider>
    </AppContext.Provider>
    </div>
  )
}

export default App
