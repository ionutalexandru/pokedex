import React, {Component} from 'react'
import 'babel-polyfill'

import {Pokedex} from './components/Pokedex'
import {fetchAll, add, destroy} from '../../store'
import {getPokemonData} from '../../actions'

export default class PokedexContainer extends Component {
  state = {
    pokemons: [],
    pokemonList: [],
    pokemonsFound: [],
    pokemonsFetched: 1,
    single_pokemon_fetching: false,
    varios_pokemons_fetching: false,
    destroying_pokemons: false,
    fetching: false,
    openDialog: false,
    pokemonToShow: [],
    pokemonsPerPage: 30,
    pageNumber: 1,
    numPages: 1,
    searchTerm: '',
  }

  fetchAllPokemons = async () => {
    const pokemons = await fetchAll()
    const pokemonsFetched = await pokemons.length
    this.setState({
      pokemons: pokemons,
      pokemonsFetched: pokemonsFetched,
    }, this.getPokemonsFound)
  }

  getPokemonsFound = async () => {
    const searchTerm = this.state.searchTerm
    if(!searchTerm){
      this.setState({
        pokemonsFound: this.state.pokemons,
      }, this.getNumPages)
    }else{
      let pokemonsFound = []
      this.state.pokemons.map(pokemon => {
        if(pokemon.name.includes(searchTerm.toLowerCase())){
          pokemonsFound.push(pokemon)
        }
        this.setState({pokemonsFound}, this.getNumPages)
      })
    }
  }

  // Fetcher Button handles
  handleFetchSinglePokemon = async () => {
    await this.setState({
      fetching: true,
      single_pokemon_fetching: true,
    })
    this.getAndSaveSinglePokemon()
      .then(
        this.setState({
          fetching: false,
          single_pokemon_fetching: false,
        })
      )
  }

  handleFetchAllPokemons = async () => {
    await this.setState({
      fetching: true,
      varios_pokemons_fetching: true,
    })
    this.getAndSaveMultiplePokemon()
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
    const pokemonToShow = this.state.pokemons.find(item => item.pokemonNumber == id)
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
    }, this.getPokemonList)
  }

  handleChangePageSize = (newValue) => {
    this.setState({
      pokemonsPerPage: newValue,
    }, this.getNumPages)
  }

  getNumPages = () => {
    const numberOfPokemons = this.state.pokemonsFound.length
    const pokemonsPerPage = this.state.pokemonsPerPage
    let numPages = Math.ceil(numberOfPokemons/pokemonsPerPage)
    numPages = numPages==0 ? 1 : numPages
    if(this.state.pageNumber>numPages){
      this.setState({
        numPages: numPages,
        pageNumber: numPages
      }, this.getPokemonList)
    }else{
      this.setState({numPages}, this.getPokemonList)
    }
  }

  getPokemonList = async () => {
    const list = this.state.pokemonsFound
    const pokemonList = []
    const firstIndex = this.state.pokemonsPerPage*(this.state.pageNumber - 1) + 1
    const lastIndex = this.state.pokemonsPerPage*this.state.pageNumber
    this.setState({
      pokemonList: list.slice(firstIndex-1, lastIndex),
    })
  }

  getAndSaveSinglePokemon = async () => {
    try {
      while(this.state.fetching) {
        const pokemonIdToFetch = await this.state.pokemonsFetched + 1
        const pokemon = await getPokemonData(pokemonIdToFetch)
        if(pokemon){
          await add(pokemon).then(this.fetchAllPokemons).then(this.getPokemonList)
        }
      }
    }catch(e){
      console.log(e)
    }
  }

  getAndSaveMultiplePokemon = async () => {
    try {
      await this.getAndSaveSinglePokemon()
    }catch(e){
      console.log(e)
    }
  }

  onChangeSearchBox = async (searchTerm) => {
    this.setState({searchTerm}, this.getPokemonsFound)
  }

  componentDidMount() {
    this.fetchAllPokemons()
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
        pokemonList = {this.state.pokemonList}
        onClickPokemon = {this.onClickPokemon}
        open = {this.state.openDialog}
        onRequestClose = {this.onRequestClose}
        pokemonToShow = {this.state.pokemonToShow}
        pokemonsPerPage={this.state.pokemonsPerPage}
        handleChangePageSize={this.handleChangePageSize}
        handleChangePageNumber={this.handleChangePageNumber}
        pageNumber={this.state.pageNumber}
        numPages={this.state.numPages}
        onChangeSearchBox={this.onChangeSearchBox}
      />
    )
  }
}
