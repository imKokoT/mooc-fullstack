import axios from 'axios'
const baseUrl = '/api/users'

let _cachedUsers = null

function getAll() {
  const request = axios.get(baseUrl)
  return request.then(response => {
    _cachedUsers = response.data
    return response.data
  })
}

function isAdmin(username) {
  for (const u of _cachedUsers)
    if(u.username === username && u.is_admin)
        return true
      
    return false
}

export default {
    isAdmin,
    getAll
}
