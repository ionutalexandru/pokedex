import React, {Component} from 'react'
import 'babel-polyfill'

import {Pokedex} from './components/Pokedex'
import {fetchAll, add, destroy} from '../../store'
import {getPokemonData} from '../../actions'

export default class PokedexContainer extends Component {
  state = {
    pokemons: [],
    pokeIdToFetch: 1,
    single_pokemon_fetching: false,
    varios_pokemons_fetching: false,
    destroying_pokemons: false,
    fetching: false,
    openDialog: false,
    pokemonToShow: [],
    pokemonsPerPage: 5,
    pageNumber: 1,
    numPages: 0,
  }

  fetchAllPokemons = () => {
    fetchAll()
      .then(pokemons => {
        this.setState({
          pokemons,
          pokeIdToFetch: pokemons.length ? pokemons[pokemons.length - 1].id + 1 : 1,
        }, this.getNumPages)
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

  onClickPokemon = (id, event) => {
    const pokemonToShow = this.state.pokemons.find(item => item.id == id)
    this.setState({
      openDialog: true,
      pokemonToShow: pokemonToShow,
    })
  }

  onRequestClose = () => {
    this.setState({
      openDialog: false,
      pokemonToShow: [],
    })
  }

  // Pagionation
  handleChangePageNumber = (newValue) => {
    this.setState({
      pageNumber: newValue,
    })
  }

  handlePrevPage = () => {
    this.setState({
      pageNumber: this.state.pageNumber - 1,
    })
  }

  handleChangePageSize = (newValue) => {
    this.setState({
      pokemonsPerPage: newValue,
    }, this.getNumPages)
  }

  getNumPages = () => {
    const numberOfPokemons = this.state.pokemons.length
    const pokemonsPerPage = this.state.pokemonsPerPage
    const numPages = Math.ceil(numberOfPokemons/pokemonsPerPage)
    this.setState({numPages})
  }

  componentDidMount() {
    this.fetchAllPokemons()
  }

  componentDidUpdate = () => {
    if(this.state.single_pokemon_fetching) {
      const pokeIdToFetch = this.state.pokeIdToFetch
      getPokemonData(pokeIdToFetch)
        .then(pokemon => add(pokemon).then(this.fetchAllPokemons))
      this.setState({
        single_pokemon_fetching: false,
        fetching: false,
      })
    }else if (this.state.varios_pokemons_fetching) {
      const pokeIdToFetch = this.state.pokeIdToFetch
      getPokemonData(pokeIdToFetch)
        .then(pokemon => add(pokemon).then(this.fetchAllPokemons))
    }
  }

  render() {
    return (
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
        onClickPokemon = {this.onClickPokemon}
        open = {this.state.openDialog}
        onRequestClose = {this.onRequestClose}
        pokemonToShow = {this.state.pokemonToShow}
        pokemonsPerPage={this.state.pokemonsPerPage}
        handleChangePageSize={this.handleChangePageSize}
        handleChangePageNumber={this.handleChangePageNumber}
        pageNumber={this.state.pageNumber}
        numPages={this.state.numPages}
      />
    )
  }
}
