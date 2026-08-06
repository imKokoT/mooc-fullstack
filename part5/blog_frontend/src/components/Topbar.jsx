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
      {
        user ?
        // if logged in 
        <>  
            <Link to="/create">new blog</Link>
            <div>
              User {user.username}
            </div>
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
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
