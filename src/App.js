import React, {Component} from "react"
import axios from 'axios'

import './App.css';

import {PokeCard} from './components'

class App extends Component {
  constructor() {
    super()
    this.state = {
      pokemons: [
        {id: 1, name: "bulbasaur" , img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"},
        {id: 2, name: "ivysaur" , img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"},
        {id: 3, name: "venusaur" , img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/3.png"}
      ],
      fetching: false,
      pokeIdToFetch: 4,
      basePokeUrl: "https://pokeapi.co/api/v2/pokemon/"
    }
  }

  handleStartButton = () => {
    this.setState({
      fetching: true,
    })
    axios.get(this.state.basePokeUrl + this.state.pokeIdToFetch)
      .then(response => {
        const {pokemons} = this.state.pokemons
        let pokemon = {id: response.data.id, name: response.data.name, img: response.data.sprites.front_default}
        this.setState({
          pokemons: [...this.state.pokemons, pokemon],
          pokeIdToFetch: this.state.pokeIdToFetch + 1,
          fetching: false,
        })
      })
  }

  handleStopButton = () => {
    this.setState({
      fetching: false,
    })
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
