import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'

import classes from './styles.css'
import {getTypeColor} from '../../utils/settings'

export const Pokecard = (props) => {

  const {
    pokemonCard,
    pokemonImage,
    pokemonName,
    pokemonFav,
    pokemonInfo,
    pokemonTypes,
    pokemonType,
  } = classes

  const {
    pokemon,
    handleClickPokemon,
    handleFavSinglePokemonButton,
  } = props

  return(
    <div className={pokemonCard}>
      <div className={pokemonFav} >
        <Tooltip title={`Add ${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)} to your FAV list`} placement="bottom">
          <IconButton onClick={handleFavSinglePokemonButton.bind(null, pokemon.id)}>
            {!pokemon.favorite
              ? <Icon className="material-icons" style={{color: 'tomato'}}>favorite_border</Icon>
              : <Icon className="material-icons" style={{color: 'tomato'}}>favorite</Icon>
            }
          </IconButton>
        </Tooltip>
      </div>
      <div className={pokemonImage} onClick = {handleClickPokemon.bind(null, pokemon.pokemonNumber)}>
        <span><img width='200vw' height='200vw' src={pokemon.sprites.front_default} alt={pokemon.name}/></span>
      </div>
      <Typography variant="caption" style={{margin: '.5vw'}} onClick = {handleClickPokemon.bind(null, pokemon.pokemonNumber)}>
        {`#${pokemon.pokemonNumber}`}
      </Typography>
      <div className={pokemonInfo} onClick = {handleClickPokemon.bind(null, pokemon.pokemonNumber)}>
        <Typography variant="title" align="center">
          <div className={pokemonName}>
            {pokemon.name}
          </div>
        </Typography>
        <div className={pokemonTypes} onClick = {handleClickPokemon.bind(null, pokemon.pokemonNumber)}>
          {pokemon.types.map(type =>
            <Typography key={`POKEMON-${pokemon.name}-${type}`} variant="body2" align="center">
              <div className={pokemonType} style={{backgroundColor: getTypeColor[type]}}>
                {type}
              </div>
            </Typography>
          )}
        </div>
      </div>
    </div>
  )
}
