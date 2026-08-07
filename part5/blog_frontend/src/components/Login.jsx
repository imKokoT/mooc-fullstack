import { useContext, useState } from 'react'
import LoginContext from '../contexts/LoginContext'
import BlogService from '../services/blogs'
import LoginService from '../services/login'
import AppContext from '../contexts/AppContext'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Box } from '@mui/material'


function Login() {
  const navigate = useNavigate()
  const { setUser } = useContext(LoginContext)
  const { setNotification } = useContext(AppContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => 
    setUsername(event.target.value)
  const handlePasswordChange = (event) =>
    setPassword(event.target.value)

  async function handleLogin(event) {
    event.preventDefault()

    try {
      const result = await LoginService.login({
        username: username,
        password: password
      })

      onSuccessLogin(result)
    }
    catch (error) {
      setNotification({
        message: 'Error ' + (error.response ? error.response.data.error : error.status),
        msgType: 'error'
      })
      console.error('login failed:', error.response.data.error)
      return
    }
  }
  
  function onSuccessLogin(data) {
    // cleanup
    setUsername('')
    setPassword('')
    
    // store user
    setUser(data)
    BlogService.setToken(data.token)
    window.localStorage.setItem('user', JSON.stringify(data))

    setNotification({
      message: 'success login!',
      msgType: 'success',
      timeout: 5
    })
    console.log('login success of user ', username)
    navigate('/')
  }

  return (
    <form onSubmit={handleLogin}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingRight: `${(100 - 100 / 3)}%`,
        gap: 1
      }}>
        <h2>Login</h2>

        <TextField id="username" label='Username' variant='standard'
          onChange={handleUsernameChange} value={username}/> 
          
        <br />
        
        <TextField id="password" label='Password' variant='standard'
          type="password" onChange={handlePasswordChange} value={password} />

        <Button sx={{margin: 1}} type="submit" variant='contained'>Login</Button>
      </Box>
    </form>
  )
}

export default Login
