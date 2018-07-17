import React, {Component} from "react"
import 'babel-polyfill';

import './App.css';

import {PokeCard, Pokedex} from './components'
import {fetchAll, add, destroy, fetchSinglePokemon} from './utils'

class App extends Component {
  state = {
    pokemons: [],
    pokeIdToFetch: 1,
    single_pokemon_fetching: false,
    varios_pokemons_fetching: false,
  }

  fetchAllPokemons = () => {
    fetchAll()
      .then(pokemons => {
        this.setState({
          pokemons,
          pokeIdToFetch: pokemons.length ? pokemons[pokemons.length - 1].id + 1 : 1,
        })
      }
    )
  }

  // Fetcher Button handles
  handleFetchSinglePokemon = () => {
    this.setState(
      state => ({single_pokemon_fetching: !state.single_pokemon_fetching})
    )
  }

  handleFetchAllPokemons = () => {
    this.setState(
      state => ({varios_pokemons_fetching: !state.varios_pokemons_fetching})
    )
  }

  handleStopFetching = () => {
    this.setState({
      single_pokemon_fetching: false,
      varios_pokemons_fetching: false,
    })
  }

  handleClearStorage = async () => {
    for (let pokemon of this.state.pokemons) {
      await destroy(pokemon.id)
        .then(await this.fetchAllPokemons)
    }
  }

  componentDidMount() {
    this.fetchAllPokemons()
  }

  componentDidUpdate = () => {
    if(this.state.single_pokemon_fetching) {
      fetchSinglePokemon(this.state.pokeIdToFetch)
        .then(response =>  {
          const pokemon = {id: response.data.id, name: response.data.name, img: response.data.sprites.front_default}
          add(pokemon)
            .then(this.fetchAllPokemons)
          this.setState({
            single_pokemon_fetching: false,
          })
        })
    }else if (this.state.varios_pokemons_fetching) {
      fetchSinglePokemon(this.state.pokeIdToFetch)
        .then(response =>  {
          const pokemon = {id: response.data.id, name: response.data.name, img: response.data.sprites.front_default}
          add(pokemon)
            .then(this.fetchAllPokemons)
        })
    }
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <Pokedex
          handleFetchSinglePokemon = {this.handleFetchSinglePokemon}
          handleFetchAllPokemons = {this.handleFetchAllPokemons}
          handleStopFetching = {this.handleStopFetching}
          handleClearStorage = {this.handleClearStorage}
        />
        <ul>
          {this.state.pokemons.map(pokemon => <PokeCard key={pokemon.id} name={pokemon.name} img={pokemon.img}/>)}
        </ul>
      </div>
    )
  }
}

export default App
