import { useState } from 'react'


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => 
    setUsername(event.target.value)
  const handlePasswordChange = (event) =>
    setPassword(event.target.value)

  function handleLogin(event) {
    event.preventDefault()

    console.log(username, password)
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
