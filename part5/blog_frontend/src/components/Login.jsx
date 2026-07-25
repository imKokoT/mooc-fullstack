import { useContext, useState } from 'react'
import LoginContext from '../contexts/LoginContext'
import LoginService from '../services/login'


function Login() {
  const { setUser } = useContext(LoginContext)
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
      console.error('login failed:', error.response.data.error)
      return
    }
  }
  
  function onSuccessLogin(data) {
    console.log('login success of user ', username)
    
    // cleanup
    setUsername('')
    setPassword('')
  
    // store user
    setUser(data)
    window.localStorage.setItem('user', JSON.stringify(data))
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
