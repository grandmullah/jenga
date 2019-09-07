import React, { Component } from 'react'
import './App.css'
import { Drizzle, generateStore } from 'drizzle'
import { DrizzleContext } from 'drizzle-react'
// import drizzleOptions from './components/options'
import Jenga from './contracts/Jenga.json'
import Home from './components/Home'
import { BrowserRouter } from 'react-router-dom'
const options = { contracts: [Jenga] }

const drizzleStore = generateStore(options)
const drizzle = new Drizzle(options, drizzleStore)

export default class App extends Component {
  render () {
    return (
      <DrizzleContext.Provider drizzle={drizzle} >
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </DrizzleContext.Provider>
    )
  }
}