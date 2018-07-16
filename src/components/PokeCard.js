import React from 'react'
import PropTypes from 'prop-types'

export const PokeCard = (props) => (
  <div>
    <div>
      {props.name}
    </div>
    <div>
      <img src={props.img}/>
    </div>
  </div>
)
