import { 
  useContext
} from 'react'
import {
  Link
} from 'react-router-dom'
import LoginContext from '../contexts/LoginContext'
import './Topbar.css'


function TopBar() {
  const {user, setUser} = useContext(LoginContext)

  function handleLogout() {
    window.localStorage.removeItem('user')
    setUser(null)
    console.log('user logout')
  } 

  return (
    <div className='topbar'>
      <Link to="/">blogs</Link>
      <Link to="/create">new blog</Link>
      {
        user ?
          // if logged in 
          <div>
            User {user.username}
            <button onClick={handleLogout}>Logout</button>
          </div> 
          : // if not
          <div>
            <Link to="/login">login</Link>
            {/* TODO: /signup */}
          </div>
      }
    </div>
  )
}

export default TopBar
