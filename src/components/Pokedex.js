import React from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {Fetcher} from './Fetcher/'
import {Pokecard} from './Pokecard/'
import classes from './styles.css'

export const Pokedex = (props) => {
  const {
    container,
    pokemonList,
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
        <div className={pokemonList}>
          {props.pokemonList.map(pokemon => <Pokecard key={pokemon.id} pokemon={pokemon}/>)}
        </div>
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
