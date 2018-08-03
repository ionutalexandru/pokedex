import React from 'react'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'


import classes from './styles.css'

export const FavPokemons = (props) => {

  const {
    button
  } = classes

  const {
    showFavButton,
    onClickFavPokemons,
    showFavPokemons,
  } = props

  return(
    <div className={button} style={{visibility: showFavButton ? 'visible' : 'hidden'}}>
      <Button variant="extendedFab" size="small" onClick={onClickFavPokemons}>
        <Icon className="material-icons" style={{color: 'tomato', marginRight: '0.25vw'}}>favorite</Icon>
        {!showFavPokemons ? 'Favorite Pokémons' : 'All Pokémons'}
      </Button>
    </div>
  )
}
