import React, {Component} from "react"
import axios from 'axios'

import './App.css';

import {PokeCard} from './components'
import {loadPokemons, createPokemon} from './lib/pokeService'
import {addPokemon} from './lib/pokeHelpers'

class App extends Component {
  constructor() {
    super()
    this.state = {
      pokemons: [],
      fetching: false,
      pokeIdToFetch: 0,
      basePokeUrl: "https://pokeapi.co/api/v2/pokemon/"
    }
  }

  handleStartButton = () => {
    this.setState({
      fetching: true,
    })
    axios.get(this.state.basePokeUrl + this.state.pokeIdToFetch)
      .then(response => {
        const pokemon = {id: response.data.id, name: response.data.name, img: response.data.sprites.front_default}
        const updatedPokemons = addPokemon(this.state.pokemons, pokemon)
        this.setState({
          pokemons: updatedPokemons,
          pokeIdToFetch: this.state.pokeIdToFetch + 1,
          fetching: false,
        })
        createPokemon(pokemon)
      })
  }

  handleStopButton = () => {
    this.setState({
      fetching: false,
    })
  }

  componentDidMount() {
    loadPokemons()
      .then(pokemons => this.setState({
        pokemons,
        pokeIdToFetch: pokemons[pokemons.length - 1].id + 1,
      })
    )
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        {this.state.fetching ? <button disabled onClick={this.handleStartButton}>Fetch a single Pokémon</button> : <button onClick={this.handleStartButton}>Fetch a single Pokémon</button>}
        {this.state.fetching ? <button onClick={this.handleStopButton}>Stop Fetching</button> : <button disabled onClick={this.handleStopButton}>Stop Fetching</button>}
        <ul>
          {this.state.pokemons.map(pokemon => <PokeCard key={pokemon.id} name={pokemon.name} img={pokemon.img}/>)}
        </ul>
      </div>
    )
  }
}

export default App
