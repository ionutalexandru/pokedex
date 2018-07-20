import axios from 'axios'

const endpoint = {
  pokemon: "https://pokeapi.co/api/v2/pokemon/",
  species: "https://pokeapi.co/api/v2/pokemon-species/",
}

export const fetchSinglePokemon = (pokeIdToFetch) => axios.get(endpoint.pokemon + pokeIdToFetch)

export const fetchPokemonSpecies = (pokeIdToFetch) => axios.get(endpoint.species + pokeIdToFetch)

export const fetchEvolutionChain = (evolutionUrl) => axios.get(evolutionUrl)
