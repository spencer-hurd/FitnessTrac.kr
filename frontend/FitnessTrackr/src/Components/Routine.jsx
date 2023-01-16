import { useState, useRef, useEffect } from "react";
import { useUser, useRoutines } from "../state/context";
import RoutineActivities from "./RoutineActivities";
import { deleteRoutine, modifyRoutine } from "../api/fetch";

import './Styles/Routine.css'
import { NavLink } from "react-router-dom";

const Routine = ({routineData}) => {
  const { user, token } = useUser()
  const { removeRoutine } = useRoutines()
  const [isEditable, setIsEditable] = useState(false)
  const [isAuthor, setIsAuthor] = useState(false)
  
  //routineRefs
  const formRef = useRef()
  const nameRef = useRef(routineData.name)
  const goalRef = useRef(routineData.goal)
  const [isPublic, setIsPublic] = useState(routineData.isPublic)

  //add delete confirmation

  useEffect(() => {
    if (user?.username === routineData.creatorName) {
      setIsAuthor(true)
    }
  }, [user])

  async function handleDelete() {
    const deadRoutine = await deleteRoutine(routineData.id, token)
    if(!deadRoutine.error) {
      removeRoutine(routineData.id)
    }
    if (deadRoutine.error) {
      console.error('Server error deleting routine:  ', deadRoutine.error)
    }
    setIsEditable(false)
  }

  async function handleRoutineEdit(e) {
    //It seems the API written for the tests requires us to send all the routine fields, this isn't my preference so it may change
    e.preventDefault()
    const patchBody = {
      name: routineData.name,
      goal: routineData.goal,
      isPublic: routineData.isPublic
    }
    if (nameRef.current.value !== routineData.name) patchBody.name = nameRef.current.value
    if (goalRef.current.value !== routineData.goal) patchBody.goal = goalRef.current.value
    if (isPublic !== routineData.isPublic) patchBody.isPublic = isPublic
    
    try {
      const patchedRoutine = await modifyRoutine(patchBody, routineData.id, token)
      console.dir(patchedRoutine)
      setIsEditable(false)
    } catch (err) {
      console.error('Error updating routine: ', err)
    }
  }

  return (
    <>
      <form className="routine" ref={formRef} onSubmit={(e) => {handleRoutineEdit(e)}}>
        <div className="routine-form-inputs">
          <div className="name">
            <label className={'routine-field'}htmlFor="routine-name">Routine: </label>
            <input type='text' ref={nameRef} defaultValue={routineData.name} disabled={!isEditable} />
          </div>
          <div className="creator">
            <label className={'routine-field'}htmlFor="creator">Creator: </label>
            <NavLink to={`/user/${routineData.creatorName}`}>{routineData.creatorName}</NavLink>
          </div>
          <b/>
          <div className="goal">
            <label className={'routine-field'}htmlFor="goal">Goal: </label>
            <input type='text' ref={goalRef} defaultValue={routineData.goal} disabled={!isEditable} />
          </div>
          <div>{
            isEditable
            ?<>
              <label className={'routine-field'}htmlFor="routine-is-public">Make public? </label>
              <input type="checkbox" checked={isPublic} onChange={() => {setIsPublic(!isPublic)}}/>
            </>
            : null
          }</div>
        </div>
      {
        isAuthor
        ? <div className="routine-buttons">{
          !isEditable
          ? <button className="routine-edit-button" onClick={ () => {setIsEditable(true)} }>Edit Routine</button>
          : <div className="edit-buttons">
              <div className="non-danger-buttons">
                <button type='button' onClick={ (e) => {setIsEditable(false); formRef.current.reset()}}>Cancel</button>
                <button>Save</button> {/* Send and return changes */}
              </div>
              <div className="danger-button">
                <button type='button' onClick={handleDelete}>Delete Routine</button>
              </div>
          </div>
        }</div>
        : null
      }
      </form>
      <RoutineActivities activities={routineData.activities} isAuthor={isAuthor} routineId={routineData.id}/>
    </>
  )
}

export default Routine