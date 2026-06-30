import axios from 'axios'
const baseUrl = 'http://localhost:3000/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const add = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll: getAll, 
  add: add, 
  update: update,
  remove: remove
}
