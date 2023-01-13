import { useRef, useState } from "react"
import { postRoutine } from "../api/fetch"
import { useUser, useRoutines } from "../state/context"

const RoutineForm = ({closeModal}) => {
  const { user, token } = useUser()
  const { addRoutine } = useRoutines()
  const [isPublic, setIsPublic] = useState(false)
  const routineNameRef = useRef()
  const routineGoalRef = useRef()
  
  async function handleSubmit(e) {
    e.preventDefault()
    const body = {
      name: routineNameRef.current.value,
      goal: routineGoalRef.current.value,
      isPublic: isPublic
    }

    try {
      //not sure I love this solution. I'd prefer the DB to just return the creatorName
      let newRoutine = await postRoutine(body, token)
      newRoutine.creatorName = user.username
      addRoutine(newRoutine)
      closeModal()
    } catch (error) {
      throw error
    }
  }
  return (
    <div className="new-routine-form-container">
      <p>Hey let's make a new routine</p>
      <form 
      className="new-routine-form"
      onSubmit={handleSubmit}>
        <div>
          <label htmlFor="routine-name">Name: </label>
          <input type="text" ref={routineNameRef} required={true}/>
        </div>
        <div>
          <label htmlFor="routine-goal">Goal: </label>
          <input type="text" ref={routineGoalRef} required={true}/>
        </div>
        <div>
          <label htmlFor="routine-is-public">Make public? </label>
          <input type="checkbox" onChange={() => {setIsPublic(!isPublic)}}/>
        </div>
        <input type="submit" value='Make new routine'/>
      </form>
    </div>
  )
}

export default RoutineForm