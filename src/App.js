import React, {Component} from "react"
import 'babel-polyfill';

import './App.css';

import {Pokedex, Header} from './components/'
import {fetchAll, add, destroy, fetchSinglePokemon} from './utils'

class App extends Component {
  state = {
    pokemons: [],
    pokeIdToFetch: 1,
    single_pokemon_fetching: false,
    varios_pokemons_fetching: false,
    destroying_pokemons: false,
    fetching: false,
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
      state => ({
        single_pokemon_fetching: !state.single_pokemon_fetching,
        fetching: !state.fetching,
      })
    )
  }

  handleFetchAllPokemons = () => {
    this.setState(
      state => ({
        varios_pokemons_fetching: !state.varios_pokemons_fetching,
        fetching: !state.fetching,
      })
    )
  }

  handleStopFetching = () => {
    this.setState({
      single_pokemon_fetching: false,
      varios_pokemons_fetching: false,
      fetching: false,
    })
  }

  handleClearStorage = async () => {
    await this.setState({
      destroying_pokemons: true,
    })
    for (let pokemon of this.state.pokemons) {
      await destroy(pokemon.id)
        .then(await this.fetchAllPokemons)
    }
    await this.setState({
      destroying_pokemons: false,
    })
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
            fetching: false,
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
        <Header/>
        <Pokedex
          handleFetchSinglePokemon = {this.handleFetchSinglePokemon}
          handleFetchAllPokemons = {this.handleFetchAllPokemons}
          handleStopFetching = {this.handleStopFetching}
          handleClearStorage = {this.handleClearStorage}
          fetchSinglePokemonButtonDisabled = {this.state.fetching || this.state.destroying_pokemons}
          fetchAllPokemonsButtonDisabled = {this.state.fetching || this.state.destroying_pokemons}
          stopFetchingButtonDisabled = {this.state.fetching}
          clearStorageButtonDisabled = {this.state.fetching || !this.state.pokemons.length || this.state.destroying_pokemons}
          pokemonList = {this.state.pokemons}
        />
      </div>
    )
  }
}

export default App
