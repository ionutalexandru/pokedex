import axios from 'axios'

const baseUrl = "http://localhost:3000/pokemons"
const baseAPIUrl = "https://pokeapi.co/api/v2/pokemon/"

export const loadPokemons = () => {
  return fetch(baseUrl)
    .then(res => res.json())
}

export const createPokemon = (pokemon) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pokemon)
  }).then(res => res.json())
}

export const fetchSinglePokemon = (pokeIdToFetch) => {
  return axios.get(baseAPIUrl + pokeIdToFetch)
}
