import React, {Component} from "react"
import 'babel-polyfill';


import './App.css';

import {PokeCard} from './components'
import {loadPokemons, createPokemon, fetchSinglePokemon, destroyPokemon} from './lib/pokeService'
import {addPokemon} from './lib/pokeHelpers'

class App extends Component {
  state = {
    pokemons: [],
    pokeIdToFetch: 0,
    single_pokemon_fetching: false,
    varios_pokemons_fetching: false,
  }

  handleFetchSinglePokeButton = () => {
    this.setState(
      state => ({single_pokemon_fetching: !state.single_pokemon_fetching})
    )
  }

  handleStopButton = () => {
    this.setState({
      single_pokemon_fetching: false,
      varios_pokemons_fetching: false,
    })
  }

  handleFetchPokemonsButton = () => {
    this.setState(
      state => ({varios_pokemons_fetching: !state.varios_pokemons_fetching})
    )
  }

  handleClearStorage = async () => {
    for (let pokemon of this.state.pokemons) {
      await destroyPokemon(pokemon.id)
    }
    this.loadAllPokemons()
  }

  loadAllPokemons = () => {
    loadPokemons()
      .then(pokemons => {
        this.setState({
          pokemons,
          pokeIdToFetch: pokemons.length ? pokemons[pokemons.length - 1].id + 1 : 1,
        })
      }
    )
  }

  componentDidMount() {
    this.loadAllPokemons()
  }

  componentDidUpdate = () => {
    if(this.state.single_pokemon_fetching) {
      fetchSinglePokemon(this.state.pokeIdToFetch)
        .then(response =>  {
          const pokemon = {id: response.data.id, name: response.data.name, img: response.data.sprites.front_default}
          const updatedPokemons = addPokemon(this.state.pokemons, pokemon)
          createPokemon(pokemon)
          this.setState({
            pokemons: updatedPokemons,
            pokeIdToFetch: this.state.pokeIdToFetch + 1,
            single_pokemon_fetching: false,
          })
        })
    }else if (this.state.varios_pokemons_fetching) {
      fetchSinglePokemon(this.state.pokeIdToFetch)
        .then(response =>  {
          const pokemon = {id: response.data.id, name: response.data.name, img: response.data.sprites.front_default}
          createPokemon(pokemon)
          const updatedPokemons = addPokemon(this.state.pokemons, pokemon)
          this.setState({
            pokemons: updatedPokemons,
            pokeIdToFetch: this.state.pokeIdToFetch + 1,
          })
        })
    }
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        {this.state.single_pokemon_fetching | this.state.varios_pokemons_fetching ? <button disabled onClick={this.handleFetchSinglePokeButton}>Fetch a single Pokémon</button> : <button onClick={this.handleFetchSinglePokeButton}>Fetch a single Pokémon</button>}
        {this.state.single_pokemon_fetching | this.state.varios_pokemons_fetching ? <button disabled onClick={this.handleFetchPokemonsButton}>Fetch Pokémons</button> : <button onClick={this.handleFetchPokemonsButton}>Fetch Pokémons</button>}
        {this.state.single_pokemon_fetching | this.state.varios_pokemons_fetching ? <button onClick={this.handleStopButton}>Stop Fetching</button> : <button disabled onClick={this.handleStopButton}>Stop Fetching</button>}
        <button onClick={this.handleClearStorage}>Clear Storage</button>
        {/* {this.state.pokemons.length & (!this.state.single_pokemon_fetching | !this.state.varios_pokemons_fetching) ? <button onClick={this.handleClearStorage}>Clear Storage</button> : <button disabled>Clear Storage</button>} */}
        <ul>
          {this.state.pokemons.map(pokemon => <PokeCard key={pokemon.id} name={pokemon.name} img={pokemon.img}/>)}
        </ul>
      </div>
    )
  }
}

export default App
