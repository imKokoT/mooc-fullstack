import { useContext, useState } from 'react'
import LoginContext from '../contexts/LoginContext'
import BlogService from '../services/blogs'
import LoginService from '../services/login'
import AppContext from '../contexts/AppContext'


function Login() {
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
        message: 'Error ' + (error.response.data.error ? error.response.data.error : error.status),
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
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username:</label>
        <input id="username" onChange={handleUsernameChange} value={username}/> <br />
        
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" onChange={handlePasswordChange} value={password} /> <br />
      </div>
      <div>
        <button className='button' type="submit">Login</button>
      </div>
    </form>
  )
}

export default Login
