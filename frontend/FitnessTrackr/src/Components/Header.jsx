import { React } from 'react'
import { NavLink } from 'react-router-dom'
import './Styles/Header.css'

const Header = () => {
  return (
    <div className='header'>
      <NavLink to='/'>
        <h2>fitnesstrac.kr</h2>
      </NavLink>
      <nav className="navbar">
        <NavLink to='routines' className={'nav-link'}>routines</NavLink>
        <NavLink to='activities' className={'nav-link'}>activities</NavLink>       
        <NavLink to='#' className={'nav-link'}>profile</NavLink>
      </nav>
    </div>
  )
}

export default Header