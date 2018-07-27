import React from 'react'
import TextField from '@material-ui/core/TextField'
import Search from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'


import classes from './styles.css'

export const MyDrawer = (props) => {
  const {
    container,
    textField,
    advanceSearchPanel
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
      <Button
        variant="contained"
        color="secondary"
        style={{marginLeft: '5vw'}}
        onClick={props.handleAdvanceSearchPanel}
      >
          {props.showAdvanceSearchPanel ? 'Hide Advanced Search Panel' : 'Show Advanced Search Panel'}
      </Button>
    </div>
  )
}
