import React, {Component} from 'react'
import 'babel-polyfill'

import {Pokedex} from './components/Pokedex'
import {getPokemonData} from '../../actions'
import {
  addItem,
  findById,
  findByTerm,
  toggleProperty,
  removeFromList,
  getTypeColor,
  pokemonTypes,
  fetchAll,
  add,
  edit,
  destroy,
} from '../../utils'

const getPokemons = {
  allPokemons(){
    return fetchAll()
  },
  searchByName(list, searchTerm){
    return searchTerm
      ? findByTerm(list, 'name', searchTerm)
      : list
  },
  searchByCategory(list, categories, operator, property = 'types'){
    return categories
      ? operator === 'or'
        ? list.filter(item => item[property].some(prop => categories.includes(prop)))
        : list.filter(
            item => item[property].every(prop => categories.includes(prop)) && item[property].length >= categories.length
          )
      : null
  },
  favorite(list, property = 'favorite'){
    return list.filter(item => item[property])
  }
}

const paginationParams = async (list, pageNumber, itemsPerPage) => {
  const numPages = Math.ceil(list.length/itemsPerPage) == 0
    ? 1
    : Math.ceil(list.length/itemsPerPage)
  const pageNumberModified = pageNumber>numPages ? numPages : pageNumber
  const firstIndex = itemsPerPage*(pageNumberModified - 1) + 1
  const lastIndex = itemsPerPage*pageNumberModified
  const pageList = list.slice(firstIndex-1, lastIndex)
  return [numPages, pageList, pageNumberModified]
}

export default class PokedexContainer extends Component {
  // State declaration
  state = {
    pokemons: [],
    pokemonList: [],
    filteredPokemonList: [],
    removingPokemons: false,
    fetching: false,
    openDialog: false,
    pokemonToShow: [],
    itemsPerPage: 10,
    pageNumber: 1,
    numPages: 1,
    displaySearchPanel: false,
    pokemonTypeOperators: ['and', 'or'],
    checkedPokemonOperator: 'or',
    pokemonTypes: pokemonTypes,
    checkedPokemonTypesArray: [],
    checkedPokemonTypes: {},
    showFavPokemonsButton: false,
    clickedShowFavPokemonsButton: false,
  }

  // Main async function -> update pokemonList and pagiantion;
  //default means that we are editing pokemons list (adding or deleting)
  //init -> after componentDidMount
  main = async(option, list) => {
    const itemsPerPage = this.state.itemsPerPage
    const selectedPageNumber = this.state.pageNumber
    if(option == 'init'){
      const pokemons = await getPokemons.allPokemons()
      const [numPages, pokemonList, pageNumber] = await paginationParams(pokemons, selectedPageNumber, itemsPerPage)
      let checkedPokemonTypes = {}
      pokemonTypes.map(type => checkedPokemonTypes[type] = false)
      const favoritePokemons = pokemons.filter(pokemon => pokemon.favorite)
      this.setState({
        pokemons,
        pokemonList,
        numPages,
        filteredPokemonList: [],
        pageNumber,
        checkedPokemonTypes,
        favoritePokemons,
        showFavPokemonsButton: favoritePokemons.length ? true : false,
      })
    }
    else if(option=='default'){
      const pokemons = await getPokemons.allPokemons()
      const [numPages, pokemonList, pageNumber] = await paginationParams(pokemons, selectedPageNumber, itemsPerPage)
      this.setState({pokemons, pokemonList, numPages, filteredPokemonList: [], pageNumber})
    }else{
      const [numPages, pokemonList, pageNumber] = await paginationParams(list, selectedPageNumber, itemsPerPage)
      this.setState({pokemonList, numPages, filteredPokemonList: list, pageNumber})
    }
  }

  // Fetching, updating and editing data
  fetchNextPokemon = async(id) => {
    try{
      const nextPokemon = await getPokemonData(id)
      await add(nextPokemon)
      await this.main('default')
    } catch(err) {
      console.error(err)
    }
  }

  handleFetchSinglePokemon = async() => {
    const nextPokemonNumber = await this.state.pokemons.length + 1
    await this.fetchNextPokemon(nextPokemonNumber)
  }

  handleFetchAllPokemons = async() => {
    await this.setState({fetching: true})
    while(this.state.fetching){
      const nextPokemonNumber = await this.state.pokemons.length + 1
      await this.fetchNextPokemon(nextPokemonNumber)
    }
  }

  handleStopFetching = () => {
    this.setState({fetching: false})
  }

  handleClearStorage = async () => {
    await this.setState({
      removingPokemons: true,
    })
    for (let pokemon of this.state.pokemons) {
      await destroy(pokemon.id)
      await this.main('default')
    }
    await this.setState({
      removingPokemons: false,
    })
  }

  // On Click Pokemon Card
  handleClickPokemon = (id, event) => {
    this.setState({
      openDialog: true,
      pokemonToShow: this.state.pokemons.find(item => item.pokemonNumber == id),
    })
  }

  handleRequestClose = () => {
    this.setState({openDialog: false, pokemonToShow: []})
  }

  // Pagionation
  handleChangePageNumber = async (newValue) => {
    await this.setState({
      pageNumber: newValue
    })
    this.state.filteredPokemonList.length
      ? await this.main(null, this.state.filteredPokemonList)
      : await this.main('default')
  }

  handleChangePageSize = async (newValue) => {
    await this.setState({
      itemsPerPage: newValue,
    })
    await this.state.filteredPokemonList.length
      ? await this.main(null, this.state.filteredPokemonList)
      : await this.main('default')
  }

  // Search a Pokémon by name
  handleSearchByName = async (searchTerm) => {
    const pokemons = this.state.pokemons
    const list = await getPokemons.searchByName(pokemons, searchTerm)
    await this.main(null, list)
  }

  // Advance Search Panel
  toggleAdvanceSearchPanel = async () => {
    this.setState({displaySearchPanel: !this.state.displaySearchPanel},
      ()=>{!this.state.displaySearchPanel ? this.main('default') : null}
    )
  }

  handleCheckedPokemonType = (type) => {
    const checkedPokemonTypes = this.state.checkedPokemonTypes
    checkedPokemonTypes[type] = !checkedPokemonTypes[type]
    const checkedPokemonTypesArray = Object.keys(checkedPokemonTypes).filter(key => checkedPokemonTypes[key])
    this.setState({checkedPokemonTypes, checkedPokemonTypesArray})
  }

  handleSearchOperator = (operator) => {
    this.setState({
      checkedPokemonOperator: operator,
    })
  }

  handleSearchAdvancedPokemonsButton = async () => {
    if(this.state.displaySearchPanel){
      const filters = this.state.checkedPokemonTypesArray
      const pokemons = this.state.pokemons
      const operator = this.state.checkedPokemonOperator
      const list = await getPokemons.searchByCategory(pokemons, filters, operator)
      await this.main(null, list)
    }else{
      await this.main('default')
    }
  }

  handleResetSearchButton = () => {
    let checkedPokemonTypes = {}
    this.state.pokemonTypes.map(type => checkedPokemonTypes[type] = false)
    this.setState({
      checkedPokemonOperator: 'or',
      checkedPokemonTypes,
      checkedPokemonTypesArray: []
    })
  }

  // Fav pokemons
  handleFavSinglePokemonButton = async (id, event) => {
    const pokemons = this.state.pokemons
    const pokemonToEdit = toggleProperty(findById(pokemons, id), 'favorite')
    const favoritePokemons = pokemonToEdit.favorite
      ? await addItem(this.state.favoritePokemons, pokemonToEdit)
      : await removeFromList(this.state.favoritePokemons, id)
    await edit(pokemonToEdit)
    await this.setState({
      favoritePokemons,
      showFavPokemonsButton: favoritePokemons.length ? true : false
    }, () => {
      this.state.clickedShowFavPokemonsButton && favoritePokemons.length
        ? this.main(null, favoritePokemons)
        : this.main(null, this.state.pokemons)
    })
  }

  handleShowFavPokemonsButton = async () => {
    const clickedShowFavPokemonsButton = !this.state.clickedShowFavPokemonsButton
    await this.setState({clickedShowFavPokemonsButton},
        () => {clickedShowFavPokemonsButton && this.state.favoritePokemons.length
          ? this.main(null, this.state.favoritePokemons)
          : this.main(null, this.state.pokemons)}
    )
  }

  componentDidMount() {
    this.main('init')
  }

  render() {
    return (
      <Pokedex
        handleFetchSinglePokemon = {this.handleFetchSinglePokemon}
        handleFetchAllPokemons = {this.handleFetchAllPokemons}
        handleStopFetching = {this.handleStopFetching}
        handleClearStorage = {this.handleClearStorage}
        fetchSinglePokemonButtonDisabled = {this.state.fetching || this.state.removingPokemons}
        fetchAllPokemonsButtonDisabled = {this.state.fetching || this.state.removingPokemons}
        stopFetchingButtonDisabled = {this.state.fetching}
        clearStorageButtonDisabled = {this.state.fetching || !this.state.pokemons.length || this.state.removingPokemons}
        pokemonList = {this.state.pokemonList}
        handleClickPokemon = {this.handleClickPokemon}
        open = {this.state.openDialog}
        handleRequestClose = {this.handleRequestClose}
        pokemonToShow = {this.state.pokemonToShow}
        itemsPerPage={this.state.itemsPerPage}
        handleChangePageSize={this.handleChangePageSize}
        handleChangePageNumber={this.handleChangePageNumber}
        pageNumber={this.state.pageNumber}
        numPages={this.state.numPages}
        handleSearchByName={this.handleSearchByName}
        toggleAdvanceSearchPanel={this.toggleAdvanceSearchPanel}
        displaySearchPanel={this.state.displaySearchPanel}
        pokemonTypes={this.state.pokemonTypes}
        checkedPokemonTypes={this.state.checkedPokemonTypes}
        pokemonTypeOperators={this.state.pokemonTypeOperators}
        checkedPokemonOperator={this.state.checkedPokemonOperator}
        handleCheckedPokemonType={this.handleCheckedPokemonType}
        handleSearchOperator={this.handleSearchOperator}
        handleResetSearchButton={this.handleResetSearchButton}
        handleSearchAdvancedPokemonsButton={this.handleSearchAdvancedPokemonsButton}
        checkedPokemonTypesArray={this.state.checkedPokemonTypesArray}
        handleShowFavPokemonsButton={this.handleShowFavPokemonsButton}
        showFavPokemonsButton={this.state.showFavPokemonsButton}
        handleFavSinglePokemonButton={this.handleFavSinglePokemonButton}
        clickedShowFavPokemonsButton={this.state.clickedShowFavPokemonsButton}
      />
    )
  }
}
