import React, {Component} from "react";

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
    }
  }

  handleStartButton = () => {
    this.setState({
      fetching: true,
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
        {this.state.fetching ? <button disabled onClick={this.handleStartButton}>Start Fetching</button> : <button onClick={this.handleStartButton}>Start Fetching</button>}
        {this.state.fetching ? <button onClick={this.handleStopButton}>Stop Fetching</button> : <button disabled onClick={this.handleStopButton}>Stop Fetching</button>}
        <ul>
          {this.state.pokemons.map(pokemon => <PokeCard key={pokemon.id} name={pokemon.name} img={pokemon.img}/>)}
        </ul>
      </div>
    )
  }
}

export default App
