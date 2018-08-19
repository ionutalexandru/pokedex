// Define the api functions

import axios from 'axios'

import {endpoints} from './settings'

const endpoint = {
  pokemon: endpoints.pokemons.pokemon,
  species: endpoints.pokemons.species,
}

export const fetchSinglePokemon = (pokeIdToFetch) => axios.get(endpoint.pokemon + pokeIdToFetch)

export const fetchPokemonSpecies = (pokeIdToFetch) => axios.get(endpoint.species + pokeIdToFetch)

export const fetchEvolutionChain = (evolutionUrl) => axios.get(evolutionUrl)
