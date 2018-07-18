import React from 'react'

import classes from './styles.css'

export const Pokecard = (props) => {
  const {
    container,
    pokemonName,
  } = classes
  return(
    <div className={container}>
      <div className={pokemonName}>
        {props.pokemon.name}
      </div>
      <span><img width='150px' height='150px' src={props.pokemon.img} alt={props.pokemon.name}/></span>
    </div>
  )
}
