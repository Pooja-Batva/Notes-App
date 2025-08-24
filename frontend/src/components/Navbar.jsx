import React from 'react'
import {NavLink} from 'react-router-dom'

function Navbar() {
  return (
    <nav>
        <ul>
            <li>
                <NavLink to='/' >Dashboard</NavLink>
            </li>
            <li>
                <NavLink to='/login' >Login</NavLink>
            </li>
            <li>
                <NavLink to='/signup' >Signup</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar