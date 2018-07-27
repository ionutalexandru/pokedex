import React from 'react'
import Collapse from '@material-ui/core/Collapse'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Search from '@material-ui/icons/Search'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormGroup from '@material-ui/core/FormGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'

import classes from './styles.css'

export const AdvanceSearchPanel = (props) => {

  const {
    container,
    typeFilter,
    buttons,
  } = classes

  return(
    <Collapse in={props.showAdvanceSearchPanel} timeout="auto" unmountOnExit className={container}>
      <CardContent>
        <Typography variant="headline" gutterBottom color="secondary">
          Advanced Search Panel
        </Typography>
        <Typography variant="caption" gutterBottom>Find your Pokémons by selecting next filters</Typography>
        <div className={typeFilter}>
          <Typography variant="title" gutterBottom>
            Pokémon Type
          </Typography>
          <FormControl component="fieldset" required>
            <FormLabel component="legend">Filter operator</FormLabel>
            <RadioGroup
              row
              value={props.checkedPokemonOperator}
              onChange={(event) => props.onChangedCheckedPokemonOperator(event.target.value)}
            >
              {props.pokemonTypeOperators.map(operator =>
                <FormControlLabel
                  key={operator}
                  value={operator}
                  control={<Radio />}
                  label={operator.toUpperCase()}
                  style={{marginLeft: '1vw', marginRight: '1vw'}}
                />
              )}
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" required>
            <FormLabel component="legend">Pokémon Type</FormLabel>
            {!props.typesToCheck.length
              ? <span style={{marginTop: '0.5vw', color: 'red', fontStyle: 'oblique', fontSize: '12px'}}>No Filters selected!</span>
              : <span></span>
            }
            <FormGroup row>
              {props.pokemonTypes.map(type =>
                <FormControlLabel
                  key={type}
                  value={type}
                  control={<Checkbox
                    checked={props.checkedPokemonTypes[type]}
                    onChange={() => props.onChangePokemonType(type)}
                  />}
                  label={type.toUpperCase()}
                  style={{marginLeft: '1vw', marginRight: '1vw'}}/>)}
            </FormGroup>
          </FormControl>
        </div>
        {props.typesToCheck.length
          ? (
            <div >
              <Button style={{marginLeft: '2vw'}} variant="contained" onClick={props.handleResetButton}>Reset Filters</Button>
              <Button style={{marginLeft: '2vw'}} variant="contained" color="secondary" onClick={props.getPokemonsFiltered}><Search/>Search</Button>
            </div>
          ) : (
            <div >
              <Button disabled style={{marginLeft: '2vw'}} variant="contained" onClick={props.handleResetButton}>Reset Filters</Button>
              <Button disabled style={{marginLeft: '2vw'}} variant="contained" color="secondary" onClick={props.getPokemonsFiltered}><Search/>Search</Button>
            </div>
          )

        }
      </CardContent>
    </Collapse>
  )
}
