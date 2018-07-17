import axios from 'axios'
import 'babel-polyfill';

import api from './storage'

const baseAPIUrl = "https://pokeapi.co/api/v2/pokemon/"

const path = "pokemons"

export const fetchSinglePokemon = (pokeIdToFetch) => {
  return axios.get(baseAPIUrl + pokeIdToFetch)
}
