import axios from 'axios'
const baseUrl = '/api/blogs'

let _token = null

function setToken(token) {
  _token = `Bearer ${token}`
}

function getAll() {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

function createBlog(blog) {
  const request = axios.post(baseUrl, blog, {
    headers: {
      Authorization: _token
    }})
  return request.then(res => res.data)
}

function updateBlog(blog) {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog, {
    headers: {
      Authorization: _token
    }})
  return request.then(res => res.data)
}

function deleteBlog(blog) {
  const request = axios.delete(`${baseUrl}/${blog.id}`, {
    headers: {
      Authorization: _token
    }})
    return request.then(res => res.data)
}
  

function likeBlog(blog, username) {
  const data = {
    by: username
  }

  const request = axios.put(`${baseUrl}/${blog.id}/like`, data, {
    headers: {
      Authorization: _token
  }})
  return request.then(res => res.data)
}

export default { 
  getAll,
  setToken,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog
}
