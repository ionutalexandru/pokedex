import React from 'react'

import classes from './styles.css'

export const Pokecard = (props) => {
  const {
    container,
    pokemon_name,
  } = classes
  return(
    <div>
      {props.list.map(item => (
        <div key={item.id} className={container}>
          <div className={pokemon_name}>
            {item.name}
          </div>
          <span><img width='150px' height='150px' src={item.img} alt={item.name}/></span>
        </div>
      ))}
    </div>
  )
}
