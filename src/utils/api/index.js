import axios from 'axios'
import 'babel-polyfill';

const endpoint = "https://pokeapi.co/api/v2/pokemon/"

export const fetchSinglePokemon = (pokeIdToFetch) => {
  return axios.get(endpoint + pokeIdToFetch)
}
