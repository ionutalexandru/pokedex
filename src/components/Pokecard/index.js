import React from 'react'

import classes from './styles.css'

export const Pokecard = (props) => {
  const {
    container,
    pokemonName,
  } = classes
  return(
    <div key={`POKEMON-CARD--${props.pokemon.name}--${props.pokemon.id}`} className={container} onClick={props.onClickPokemon.bind(null, props.pokemon.id)}>
      <div className={pokemonName}>
        {props.pokemon.name}
      </div>
      <span><img width='150px' height='150px' src={props.pokemon.sprites.front_default} alt={props.pokemon.name}/></span>
    </div>
  )
}
