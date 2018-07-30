import React from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {Fetcher} from './Fetcher/'
import {Pagination} from './Pagination'
import {MyDrawer} from './MyDrawer/'
import {AdvanceSearchPanel} from './AdvanceSearchPanel/'
import {Pokecard, PokeDialog} from '../../../components'
import classes from './styles.css'

export const Pokedex = (props) => {
  const {
    container,
    pokemonList,
    paginationAndDrawer,
    listItem,
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
              onChangeSearchBox={props.onChangeSearchBox}
              handleAdvanceSearchPanel={props.handleAdvanceSearchPanel}
              showAdvanceSearchPanel={props.showAdvanceSearchPanel}
            />
          </div>
          <div className={listItem} style={{borderLeft: '1px solid grey'}}>
            <Pagination
              pokemonsPerPage={props.pokemonsPerPage}
              handleChangePageSize={props.handleChangePageSize}
              handleChangePageNumber={props.handleChangePageNumber}
              pageNumber={props.pageNumber}
              numPages={props.numPages}
            />
          </div>
        </div>
        <AdvanceSearchPanel
          showAdvanceSearchPanel={props.showAdvanceSearchPanel}
          pokemonTypes={props.pokemonTypes}
          checkedPokemonTypes={props.checkedPokemonTypes}
          pokemonTypeOperators={props.pokemonTypeOperators}
          checkedPokemonOperator={props.checkedPokemonOperator}
          onChangePokemonType={props.onChangePokemonType}
          onChangedCheckedPokemonOperator={props.onChangedCheckedPokemonOperator}
          handleResetButton={props.handleResetButton}
          getPokemonsFiltered={props.getPokemonsFiltered}
          typesToCheck={props.typesToCheck}
        />
        <div className={pokemonList}>
          {!props.pokemonList.length
            ? (<div className={noPokemonsFound}>
                No Pokémons to show! =(
              </div>)
            : props.pokemonList.map(pokemon =>
                <Pokecard
                  key={`POKEMON-CARD--${pokemon.name}`}
                  pokemon={pokemon}
                  onClickPokemon={props.onClickPokemon}
                  addPokemonToFavList={props.addPokemonToFavList}
                  favButtonPushed={props.favButtonPushed}
                />)
          }
        </div>
        <PokeDialog
          open = {props.open}
          onRequestClose = {props.onRequestClose}
          pokemonToShow = {props.pokemonToShow}
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
