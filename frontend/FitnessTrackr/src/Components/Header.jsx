import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useUser } from '../state/context'
import Modal from 'react-modal'
import AuthForm from './AuthForm'
import './Styles/Header.css'
import buffarm from './Styles/buffarm.png'
import buffarm2 from './Styles/buffarm-2.png'
import SideNav from './SideNav'

const Header = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const {user, token, setToken, setUser} = useUser()

  //modal funcs
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    
  }

  function closeModal() {
    setIsOpen(false);
  }

  //auth funcs
  function signOut() {
    setToken(null);
    localStorage.removeItem('token') 
    setUser(null); 
    localStorage.removeItem('user') 
  }
  return (
    <>
      <div className='header'>
        <NavLink to='/' className={'site-logo'}>
        <div className='arm-container'>
            <img src={buffarm} className='buff-arm'/>
          </div>
          <div className='site-names'>
            <h2 className='site-name'>fitness</h2>
           <h2 className='site-name'>trac.kr</h2>
          </div>
          <div className='arm-container'>
            <img src={buffarm2} className='buff-arm'/>
          </div>
        </NavLink>
        <div className="nav-sign-in"> 
          {/* <nav className="navbar">
            {user 
            ? <NavLink to='my-routines' className={'nav-link'}>my routines</NavLink>
            : null
            } </nav>
            <NavLink to='routines' className={'nav-link'}>routines</NavLink>
            <NavLink to='activities' className={'nav-link'}>activities</NavLink> */}
          {/* If logged in, change this button to sign out with a welcome */}
          <SideNav user={user}/>
          {token 
          ? <>
              <p className='greeting'>Hey, {user.username}!</p>
              <NavLink to='/'>
              <button className='sign-out-button' onClick={signOut}>Sign Out!</button>
              </NavLink>
            </>
          : <button className='sign-in-button' onClick={openModal}>Sign In/Sign up!</button>
          }
        </div>
      </div>
      <Modal 
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      className={(modalIsOpen ? 'AuthModal open-modal' : 'AuthModal')}
      overlayClassName='AuthOverlay'
      portalClassName="ModalPortal"
      contentLabel="Login Modal"
      >
        <AuthForm closeModal={closeModal}/>
      </Modal>
    </>
  )
}

export default Header