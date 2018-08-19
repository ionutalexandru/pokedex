import React from 'react'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

import classes from './styles.css'

export const Pagination = (props) => {
  const {
    container,
    pagination,
  } = classes

  return (
    <div className={container}>
      <SelectField
        floatingLabelText="Select page size"
        value={props.itemsPerPage}
        onChange={(event, index, value) => props.handleChangePageSize(value)}
      >
        <MenuItem value={5} primaryText='5' />
        <MenuItem value={10} primaryText='10' />
        <MenuItem value={30} primaryText='30' />
        <MenuItem value={45} primaryText='45' />
      </SelectField>
      <div className={pagination}>
        <HardwareKeyboardArrowLeft
          style={props.pageNumber==1 ? {cursor:'not-allowed'} : {cursor: 'pointer'}}
          onClick={() => props.pageNumber === 1 ? undefined : props.handleChangePageNumber(props.pageNumber-1)}
        />
        Page {props.pageNumber}/{props.numPages}
        <HardwareKeyboardArrowRight
          style={props.pageNumber==props.numPages ? {cursor:'not-allowed'} : {cursor: 'pointer'}}
          onClick={() => props.pageNumber === props.numPages ? undefined : props.handleChangePageNumber(props.pageNumber+1)}
        />
      </div>
    </div>
  )
}
