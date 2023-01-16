import { NavLink } from "react-router-dom"
import './Styles/SideNav.css'
import buffarm2 from '../assets/buffarm-2.png'
const SideNav = ({user}) => {
    return (
            <nav className="navbar">
            <NavLink to="/" className="mini-logo">
            <h3>FT</h3>
            <img className='buff-arm-mini' src={buffarm2}></img>
            </NavLink>
            {user
            ? <NavLink to='my-routines' className={'nav-link'}>my routines</NavLink>
            : null
            }
            <NavLink to='routines' className={'nav-link'}>routines</NavLink>
            <NavLink to='activities' className={'nav-link'}>activities</NavLink>
             </nav>   
    )
}

export default SideNav
