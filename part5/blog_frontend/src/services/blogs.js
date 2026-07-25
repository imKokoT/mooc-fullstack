import axios from 'axios'
const baseUrl = '/api/blogs'

let _token = null

function setToken(token) {
  _token = token
}

function getAll() {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { 
  getAll,
  setToken
}
