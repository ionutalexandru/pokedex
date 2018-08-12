// In this file, the request function is defined. This function get and edit the DB.

import {endpoints} from './settings'

const endpoint = endpoints.db.endpoint
const path = endpoints.db.path

// request: function expression
const request = (path, method, data) => {
  
  // Define Headers
  const headers = new Headers()
  headers.append('Accept','application/json')
  headers.append('Content-Type','application/json')

  // Request's options
  const url = `${endpoint}/${path}`
  const options = {
    method,
    headers: headers,
  }
  options.body = data ? JSON.stringify(data) : null

  // Return
  return fetch(new Request(url, options))
}

// Define jsonStorage object that collect all possible requests
const jsonStorage = {
  getAll(path){
    return fetch(`${endpoint}/${path}`)
  },
  post(path, data = {}){
    return request(path, 'POST', data)
  },
  put(path, data={}){
    return request(path, 'PUT', data)
  },
  delete(path){
    return request(path,'DELETE')
  }
}

// Get all items from DB
export const fetchAll = async () => {
  try {
    const response = await jsonStorage.getAll(path)
    return await response.ok ? response.json() : null
  } catch(err) {
    console.error(err)
  }
}

// Add data to DB
export const add = async (data) => {
  try {
    const response = await jsonStorage.post(path, data)
    await response.ok
      ? console.log(`${data.name} added to the DB`)
      : null
  } catch(err) {
    console.error(err)
  }
}

// Edit data in DB
export const edit = async (data) => {
  try {
    const response = await jsonStorage.put(`${path}/${data.id}`, data)
    await response.ok
      ? console.log(`${data.name} edited in the DB`)
      : null
  } catch(err) {
    console.error(err)
  }
}

// Destroy an item from DB defined by id
export const destroy = async (id) => {
  try {
    const response = await jsonStorage.delete(`${path}/${id}`)
    await response.ok
      ? console.log(`${id} deleted from DB`)
      : null
  } catch(err) {
    console.error(err)
  }
}
