import axios from 'axios'

const endpoint = "https://pokeapi.co/api/v2/pokemon/"

export const fetchSinglePokemon = (pokeIdToFetch) => axios.get(endpoint + pokeIdToFetch)
