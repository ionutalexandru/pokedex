const baseUrl = "http://localhost:3000/pokemons"

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
