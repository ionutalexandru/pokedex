import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download'
import Stop from 'material-ui/svg-icons/av/stop'
import Clear from 'material-ui/svg-icons/content/clear'

const buttonStyle = {
  marginRight: '10px',
  marginBottom: '10px',
}

export const Fetcher = (props) => {
  return (
    <div>
      <RaisedButton
        label = "Fetch a Single Pokémon"
        style = {buttonStyle}
        icon = {<FileCloudDownload/>}
        onClick = {props.handleFetchSinglePokemon}
      />
      <RaisedButton
        label = "Fetch All Pokémons"
        style = {buttonStyle}
        icon = {<FileCloudDownload/>}
        onClick = {props.handleFetchAllPokemons}
      />
      <RaisedButton
        label = "Stop Fetching"
        style = {buttonStyle}
        icon = {<Stop/>}
        onClick = {props.handleStopFetching}
      />
      <RaisedButton
        label = "Clear Storage"
        style = {buttonStyle}
        icon = {<Clear/>}
        onClick = {props.handleClearStorage}
      />
    </div>
  )
}
