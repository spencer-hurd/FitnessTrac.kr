import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from "../state/context"
import { fetchMe } from "../api/auth"
import UserRoutines from "./UserRoutines"
import Modal from 'react-modal'
import RoutineForm from './RoutineForm'

const MyRoutines = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { user, token } = useUser()
  let username

  //modal funcs
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  useEffect(() => {
    if (!user){
      navigate('/')
      //alert('Please login to see your routines')
    }
  }, [])
  
  //for security purposes, make sure the local user can be auth'd on this page
  //one could simply add a user to localStorage and refresh the page to gain access to a user's private posts otherwise
  if (user) {
    async function compareUserToDB() {
      const DBUser = await fetchMe(token)
      if (DBUser.username === user.username) {
        return true
      } else {
        alert('Local user cannot be authenticated')
        return false
      }
    }
  
    compareUserToDB() ? username = user.username : null
  }

  return (
    <div> 
      <div>
        <p className='routine-intro'>Your routines, {username}!</p>
        <button className='new-routine-button' onClick={openModal}>Create a new routine</button>
      </div>
      <UserRoutines currentUsername={username}/>
      <Modal 
      closeTimeoutMS={300}
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      className={(modalIsOpen ? 'AuthModal Open' : 'AuthModal Close')}
      overlayClassName='AuthOverlay'
      portalClassName="ModalPortal"
      contentLabel="Login Modal"
      >
        <RoutineForm closeModal={closeModal}/>
      </Modal>
    </div>
  )
}

export default MyRoutines