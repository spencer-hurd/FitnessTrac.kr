import { useRef } from "react"
import { postActivity } from "../api/fetch"
import { useUser, useActivities } from "../state/context"

const NewActivityForm = ({closeModal}) => {
  const {token} = useUser()
  const {addNewActivity} = useActivities()
  const activityNameRef = useRef()
  const activityDescriptionRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    const body = {
      name: activityNameRef.current.value,
      description: activityDescriptionRef.current.value
    }
   try {
    let newActivity = await postActivity(body, token)
    if (newActivity.error) {
      alert('That activity name is already taken, please choose another.')
      throw new Error(newActivity.error)
    }
    addNewActivity(newActivity)
    closeModal()
   } catch (error) {
     throw error
   }
  }
  return (
    <div className="new-activity-form">
      <p>Make a new activity: </p>
      <form 
      className="new-activity-form"
      onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="activity-name">Name: </label>
          <input type="text" ref={activityNameRef} required={true}/>
        </div>
        <div>
          <label htmlFor="activity-description">Description: </label>
          <input type="text" ref={activityDescriptionRef} required={true}/>
        </div>
        <input type="submit" value='Make new activity'/>
      </form>
    </div>
  )
}


export default NewActivityForm