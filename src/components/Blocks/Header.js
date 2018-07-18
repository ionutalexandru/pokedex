import React from 'react'

import classes from './styles.css'

export const Header = () => {
  const {
    header,
    container,
    headerTitle,
    subHeaderText
  } = classes

  return(
    <div className={header}>
      <div className={container}>
        <div className={headerTitle}>
          <b>Pokédex</b>
        </div>
        <div className={subHeaderText}>
          A project developed with React JS
        </div>
      </div>
    </div>
  )
}
