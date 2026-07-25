import axios from 'axios'
const baseUrl = '/api/login'

function login(login) {
  const request = axios.post(baseUrl, login)
  return request.then(response => response.data)
}

export default { login }
