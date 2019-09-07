import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap';
import './components.css'

export default class navbar extends Component {
  render () {
    return (
      <div className='navbar'>
        <Button outline color='link'>
          <NavLink to='/'className='button'>HOME</NavLink>
        </Button>
        <div>
          <NavLink to='/' className='App'>Help</NavLink>
        </div>
        <div>
          <NavLink to='/' className='App'>About us</NavLink>
        </div>
      </div>
    )
  }
}