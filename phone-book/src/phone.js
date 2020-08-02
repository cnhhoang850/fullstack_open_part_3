import axios from 'axios'

const baseUrl = '/api/persons'


const getAll = () => {
   const request = axios.get(baseUrl)
   return request.then(response => response.data)
}

const create = (newObject) => {
   return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
   return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
   return axios.delete(`${baseUrl}/${id}`)
}

export default {
       getAll,
       create,
       update,
       remove
   }