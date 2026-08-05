import { 
  useState, useEffect, useContext
} from 'react'
import {
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import AppContext from './contexts/AppContext'
import BlogService from './services/blogs'
import UsersService from './services/users'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Login from './components/Login'
import LoginContext from './contexts/LoginContext'
import Notification from './components/Notification'
import './App.css'
import Home from './components/Home'
import TopBar from './components/Topbar'


function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  // --- cache users ---
  useEffect(() => {
    UsersService.getAll()
  }, [])

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

      <Routes>
        <Route path="/blogs/:id" element={
          null
        } />
        <Route path="/create" element={
          <NewBlogForm />
        } />
        <Route path="/login" element={
          <Login />
        } />
        <Route path="/" element={<Home />} />
      </Routes>
    
    </LoginContext.Provider>
    </AppContext.Provider>
    </div>
  )
}

export default App
