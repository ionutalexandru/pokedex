import React from 'react'
import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download'
import Stop from 'material-ui/svg-icons/av/stop'
import Clear from 'material-ui/svg-icons/content/clear'

import classes from './styles.css'

export const Fetcher = (props) => {
  const buttonStyle = {
    marginRight: '10px',
  }

  const {
    container
  } = classes

  return (
    <div className={container}>
      <RaisedButton
        label = "Fetch a Single Pokémon"
        style = {buttonStyle}
        icon = {<FileCloudDownload/>}
        onClick = {props.handleFetchSinglePokemon}
        disabled = {props.fetchSinglePokemonButtonDisabled}
      />
      <RaisedButton
        label = "Fetch All Pokémons"
        style = {buttonStyle}
        icon = {<FileCloudDownload/>}
        onClick = {props.handleFetchAllPokemons}
        disabled = {props.fetchAllPokemonsButtonDisabled}
      />
      <RaisedButton
        label = "Stop Fetching"
        style = {buttonStyle}
        icon = {<Stop/>}
        onClick = {props.handleStopFetching}
        disabled = {!props.stopFetchingButtonDisabled}
      />
      <RaisedButton
        label = "Clear Storage"
        style = {buttonStyle}
        icon = {<Clear/>}
        onClick = {props.handleClearStorage}
        disabled = {props.clearStorageButtonDisabled}
      />
    </div>
  )
}

Fetcher.propTypes = {
  handleFetchSinglePokemon: PropTypes.func.isRequired,
  handleFetchAllPokemons: PropTypes.func.isRequired,
  handleStopFetching: PropTypes.func.isRequired,
  handleClearStorage: PropTypes.func.isRequired,
}
