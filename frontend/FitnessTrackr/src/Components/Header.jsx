import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useUser } from '../state/context'
import Modal from 'react-modal'
import AuthForm from './AuthForm'

import './Styles/Header.css'
import buffarm from '../assets/buffarm.png'
import buffarm2 from '../assets/buffarm-2.png'

const Header = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const {user, token, setToken, setUser} = useUser()

  //modal funcs
  function openModal() {
    setIsOpen(true);
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
          {token 
          ? <>
              <p className='greeting'>Hey, {user.username}!</p>
              <NavLink to='/'>
              <button className='sign-in-out-button' onClick={signOut}>Sign Out!</button>
              </NavLink>
            </>
          : <>
            <p style={{height: '1rem'}}></p>
              <button className='sign-in-out-button' onClick={openModal}>Sign In/Sign up!</button>
          </>
          }
        </div>
      </div>
      <Modal 
      closeTimeoutMS={300}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={"AuthModal"}
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