import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { DrizzleContext } from 'drizzle-react'
import Navbar from './navbar'
import Projects from './projects'
import Apply from "./apply";
import Transfer from'./payment'
import Default from './default'
import '../App.css'

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext
      if (!initialized) {
        return 'Loading...'
      }
      return (
        <div className='App' >
          <Navbar />
          <Switch>
            <Route exact path='/' render={(props) => <Apply {...props} drizzle={drizzle} drizzleState={drizzleState} /> } />
            <Route exact path='/project/:name' render={(props) => <Projects {...props} drizzle={drizzle} drizzleState={drizzleState} /> } />
            <Route exact path='/transfer/:name' render={(props) => <Transfer {...props} drizzle={drizzle} drizzleState={drizzleState} /> } />
            <Route component={Default} />
          </Switch>
        </div>
      )
    }}
  </DrizzleContext.Consumer>
)