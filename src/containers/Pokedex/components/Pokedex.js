import React from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {Fetcher} from './Fetcher/'
import {Pagination} from './Pagination'
import {MyDrawer} from './MyDrawer/'
import {AdvanceSearchPanel} from './AdvanceSearchPanel/'
import {Pokecard, PokeDialog, FavPokemons} from '../../../components'
import classes from './styles.css'

export const Pokedex = (props) => {
  const {
    container,
    pokemonList,
    paginationAndDrawer,
    listItem,
    FavPokemonsStyle,
    noPokemonsFound,
  } = classes


  return (
    <MuiThemeProvider>
      <div className={container}>
        <Fetcher
          handleFetchSinglePokemon = {props.handleFetchSinglePokemon}
          handleFetchAllPokemons = {props.handleFetchAllPokemons}
          handleStopFetching = {props.handleStopFetching}
          handleClearStorage = {props.handleClearStorage}
          fetchSinglePokemonButtonDisabled = {props.fetchSinglePokemonButtonDisabled}
          fetchAllPokemonsButtonDisabled = {props.fetchAllPokemonsButtonDisabled}
          stopFetchingButtonDisabled = {props.stopFetchingButtonDisabled}
          clearStorageButtonDisabled = {props.clearStorageButtonDisabled}
        />
        <div className={paginationAndDrawer}>
          <div className={listItem}>
            <MyDrawer
              handleSearchByName={props.handleSearchByName}
              toggleAdvanceSearchPanel={props.toggleAdvanceSearchPanel}
              displaySearchPanel={props.displaySearchPanel}
            />
          </div>
          <div className={listItem} style={{borderLeft: '1px solid grey'}}>
            <Pagination
              itemsPerPage={props.itemsPerPage}
              handleChangePageSize={props.handleChangePageSize}
              handleChangePageNumber={props.handleChangePageNumber}
              pageNumber={props.pageNumber}
              numPages={props.numPages}
            />
          </div>
        </div>
        <AdvanceSearchPanel
          displaySearchPanel={props.displaySearchPanel}
          pokemonTypes={props.pokemonTypes}
          checkedPokemonTypes={props.checkedPokemonTypes}
          pokemonTypeOperators={props.pokemonTypeOperators}
          checkedPokemonOperator={props.checkedPokemonOperator}
          handleCheckedPokemonType={props.handleCheckedPokemonType}
          handleSearchOperator={props.handleSearchOperator}
          handleResetSearchButton={props.handleResetSearchButton}
          handleSearchAdvancedPokemonsButton={props.handleSearchAdvancedPokemonsButton}
          checkedPokemonTypesArray={props.checkedPokemonTypesArray}
        />
        <div className={pokemonList}>
          {!props.pokemonList.length
            ? (<div className={noPokemonsFound}>
                No Pokémons to show! Heeeeee =(
              </div>)
            : props.pokemonList.map(pokemon =>
                <Pokecard
                  key={`POKEMON-CARD--${pokemon.name}`}
                  pokemon={pokemon}
                  handleClickPokemon={props.handleClickPokemon}
                  handleFavSinglePokemonButton={props.handleFavSinglePokemonButton}
                />)
          }
        </div>
        <PokeDialog
          open = {props.open}
          handleRequestClose = {props.handleRequestClose}
          pokemonToShow = {props.pokemonToShow}
        />
        <FavPokemons
          showFavPokemonsButton={props.showFavPokemonsButton}
          handleShowFavPokemonsButton={props.handleShowFavPokemonsButton}
          clickedShowFavPokemonsButton={props.clickedShowFavPokemonsButton}
        />
      </div>
    </MuiThemeProvider>
  )
}

Pokedex.propTypes = {
  handleFetchSinglePokemon: PropTypes.func.isRequired,
  handleFetchAllPokemons: PropTypes.func.isRequired,
  handleStopFetching: PropTypes.func.isRequired,
  handleClearStorage: PropTypes.func.isRequired,
}
