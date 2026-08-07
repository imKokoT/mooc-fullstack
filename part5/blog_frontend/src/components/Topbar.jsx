import { 
  useContext
} from 'react'
import {
  Link
} from 'react-router-dom'
import LoginContext from '../contexts/LoginContext'
import './Topbar.css'
import { Toolbar, Button, AppBar, Typography, Box } from '@mui/material'


function TopBar() {
  const style = {
    color: '#fff'
  }
  const {user, setUser} = useContext(LoginContext)

  function handleLogout() {
    window.localStorage.removeItem('user')
    setUser(null)
    console.log('user logout')
  } 

  return (
    <AppBar position='static'>
      <Toolbar>
        {/* title */}
        <Typography variant='h5'>Blogs App</Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* buttons */}
        <Button component={Link} to="/" style={style}>blogs</Button>
        {
          user ?
          // if logged in 
            <>  
              <Button component={Link} to="/create" style={style}>new blog</Button>
              
              <Button onClick={handleLogout} style={style}>Logout</Button>
              
              <Typography>
                USER {user.username}
              </Typography>
            </>
            : // if not
            <>
              <Button component={Link} to="/login" style={style}>login</Button>
              {/* TODO: /signup */}
            </>
        }
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
