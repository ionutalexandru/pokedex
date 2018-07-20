// Export Pokemon functions

import {fetchSinglePokemon, fetchPokemonSpecies, fetchEvolutionChain} from '../utils'

const getEvolutionChainUrl = async (id) => {
  try {
    const res = await fetchPokemonSpecies(id)
    if(res.status == 200){
      return res.data.evolution_chain.url
    }
  }catch(e) {
    console.error(e)
  }
}

const getEvolutionPokemons = async (url) => {
  try {
    const res = await fetchEvolutionChain(url)
    if(res.status == 200){
      const evolutionChain = [res.data.chain.species.name]
      if(res.data.chain.evolves_to.length){
        evolutionChain.push(res.data.chain.evolves_to["0"].species.name)
        if(res.data.chain.evolves_to["0"].evolves_to.length){
          evolutionChain.push(res.data.chain.evolves_to["0"].evolves_to["0"].species.name)
        }
      }
      return evolutionChain
    }
  }catch(e) {
    console.error(e)
  }
}

export const getPokemonData = async (id) => {
  try {
    const url = await getEvolutionChainUrl(id)
    const evolutionChain = await getEvolutionPokemons(url)
    const res = await fetchSinglePokemon(id)
    const types = []
    res.data.types.map(item => types.push(item.type.name))
    const pokemon = {
      id: res.data.id,
      name: res.data.name,
      sprites: {
        back_default: res.data.sprites.back_default,
        back_shiny: res.data.sprites.back_shiny,
        front_default: res.data.sprites.front_default,
        front_shiny: res.data.sprites.front_shiny,
      },
      base_experience: res.data.base_experience,
      types: types,
      evolutionChain: evolutionChain,
    }
    return pokemon
  }catch(e){
    console.log(e)
  }
}
