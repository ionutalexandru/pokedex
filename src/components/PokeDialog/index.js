import React from 'react'
import Dialog from 'material-ui/Dialog'

import classes from './styles.css'

export const PokeDialog = (props) => {
  const bodyStyle = {
    padding: '0px'
  }
  const {
    container,
    header,
    title,
    pokemonNumber,
    experience,
    imgContainer,
    subHeader,
    typeStyle,
    evChain,
    same,
    evChainTitle,
    evChainContainer
  } = classes
  const pokemon = props.pokemonToShow

  return (
    Object.keys(pokemon).length ?
      <Dialog
        bodyStyle={bodyStyle}
        open={props.open}
        onRequestClose={props.onRequestClose}
        >
          <div className={container}>
            <div className={header}>
              <div className={title}>{pokemon.name}</div>
              <div className={pokemonNumber}>{pokemon.id}</div>
            </div>
            <div className={subHeader}>
              <div className={experience}>EXP: {pokemon.base_experience}</div>
              {pokemon.types.map(type => <div key={type} className={typeStyle}>{type}</div>)}
            </div>
            <div className={imgContainer}>
              {Object.keys(pokemon.sprites).map(key =>
                <img key={key} width='160px' height='160px' src={pokemon.sprites[key]}/>
              )}
            </div>
            <div>
              <div className={evChainTitle}>
                EVOLUTION CHAIN
              </div>
              <div className={evChainContainer}>
                {pokemon.evolutionChain.map(evPokemon =>
                  <div className={evChain}>
                    {evPokemon===pokemon.name
                      ? <div key={evPokemon} className={same}>{evPokemon}</div>
                      : <div key={evPokemon}>{evPokemon}</div>}
                  </div>
                )}
              </div>
            </div>
        </div>
      </Dialog>
    : null
  )
}
