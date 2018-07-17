// Define in this function jsonStorage function
// Requests can be done: getAll, post and delete

const endpoint = "http://localhost:3000"
const path = "pokemons"

// Define Headers
const headers = new Headers()
headers.append('Accept','application/json')
headers.append('Content-Type','application/json')

// Define request function
const request = (path, method, data) => {
  const url = `${endpoint}/${path}`
  const options = {
    method,
    headers: headers,
  }
  if (data) {
    options.body = JSON.stringify(data)
  }
  return fetch(new Request(url, options))
}

// Define jsonStorage objects that collect all requests
const jsonStorage = {
  getAll(path){
    return fetch(`${endpoint}/${path}`)
  },
  post(path, data = {}){
    return request(path, 'POST', data)
  },
  delete(path){
    return request(path,'DELETE')
  }
}

// Get all items from DB
export const fetchAll = async () => {
  try {
    const response = await jsonStorage.getAll(path)
    if (response.ok) {
      const jsonData = await response.json()
      return jsonData
    }else{
      console.log(response.status)
      // Do something else
    }
  }catch(e){
    console.error(e)
    // Do something else
  }
}

// Add data to DB
export const add = async (data) => {
  try {
    const response = await jsonStorage.post(path, data)
    if(await response.ok){
      console.log('POKEMON ADDED TO DB')
    }else{
      console.log(response.status)
      // Do something else
    }
  }catch(e){
    console.error(e)
    // Do something else
  }
}

// Destroy an item from DB defined by id
export const destroy = async (id) => {
  try {
    const response = await jsonStorage.delete(`${path}/${id}`)
    if(await response.ok){
      console.log('POKEMON DELETED')
    }else{
      console.log(response.status)
      // Do something else
    }
  }catch(e){
    console.error(e)
    // Do something else
  }
}
