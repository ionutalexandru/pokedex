import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'

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
        onClick = {props.handleFetchSinglePokemon}
      />
      <RaisedButton
        label = "Fetch All Pokémons"
        style = {buttonStyle}
        onClick = {props.handleFetchAllPokemons}
      />
      <RaisedButton
        label = "Stop Fetching"
        style = {buttonStyle}
        onClick = {props.handleStopFetching}
      />
      <RaisedButton
        label = "Clear Storage"
        style = {buttonStyle}
        onClick = {props.handleClearStorage}
      />
    </div>
  )
}
