import React from 'react'
import TextField from '@material-ui/core/TextField'
import Search from '@material-ui/icons/Search'

import classes from './styles.css'

export const MyDrawer = (props) => {
  const {
    container,
    textField,
  } = classes
  return(
    <div className={container}>
      <Search
        style={{marginRight: '2vw'}}
      />
      <TextField
        className={textField}
        id="search"
        label="Search a Pokémon"
        type="search"
        style={{marginBottom: '2%'}}
        onChange={(event) => props.onChangeSearchBox(event.target.value)}
      />
    </div>
  )
}
