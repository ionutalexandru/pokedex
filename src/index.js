import React from "react"
import ReactDOM from "react-dom"

import Pokedex from './containers/Pokedex'
import {Header} from './components'
import './index.css'

ReactDOM.render(
  <div>
    <Header />
    <Pokedex />
  </div>,
  document.getElementById('root')
)
