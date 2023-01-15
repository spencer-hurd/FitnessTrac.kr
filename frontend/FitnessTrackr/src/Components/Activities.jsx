import { useEffect, useState} from "react";
import { useActivities } from "../state/context";
import { getActivities } from "../api/fetch";
import Activity from "./Activity"
import Modal from 'react-modal'
import NewActivityForm from './NewActivityForm'
import './Styles/Activities.css'

const Activities = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const {activities, populateActivities} = useActivities()

  useEffect(() => {
    const fetchActivities = async () => {
      const freshActivities = await getActivities()
      populateActivities(freshActivities)
    }
    fetchActivities()
  }, [])

  //modal funcs
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    
  }

  function closeModal() {
    setIsOpen(false);
  }

  //Add modal to create activity
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className='AuthModal'
        overlayClassName='AuthOverlay'
        portalClassName="ModalPortal"
        contentLabel="Activity Modal"
      >
        <NewActivityForm closeModal={closeModal}/>
      </Modal>
      <button onClick={openModal}>Make a new activity!</button>
      {activities.length > 0
      ? <div className="activities-container">{
        activities.map((activity) => {
          return (
            <div className="activity-card" key={activity.id}>
              <Activity activity={activity}/>
            </div>
          )
        })
      }</div>
      : null
      }
    </>
  )
}

export default Activities