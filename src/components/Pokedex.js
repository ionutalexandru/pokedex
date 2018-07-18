import React from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {Fetcher} from './Fetcher/'
import {Pokecard} from './Pokecard/'

export const Pokedex = (props) => {
  return (
    <MuiThemeProvider>
      <div>
        <Fetcher
          handleFetchSinglePokemon = {props.handleFetchSinglePokemon}
          handleFetchAllPokemons = {props.handleFetchAllPokemons}
          handleStopFetching = {props.handleStopFetching}
          handleClearStorage = {props.handleClearStorage}
        />
        <Pokecard
          list = {props.list}
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
