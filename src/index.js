import React from "react"
import ReactDOM from "react-dom"

import PokedexContainer from './containers/Pokedex'
import {Header} from './components'
import './index.css'

ReactDOM.render(
  <div>
    <Header />
    <PokedexContainer />
  </div>,
  document.getElementById('root')
)
