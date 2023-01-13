import React, { useState } from "react";
import { useUser, useRoutines } from "../state/context";
import RoutineActivities from "./RoutineActivities";
import { deleteRoutine } from "../api/fetch";

import './Styles/Routine.css'

const Routine = ({routineData}) => {
  const [isEditable, setIsEditable] = useState(false)
  const { user, token } = useUser()
  const { removeRoutine } = useRoutines()
  //set default value then save something in state
  //add delete confirmation

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

  return (
    <>
      <div className="routine">
        <div>
          <label htmlFor="routine-name">Routine: </label>
          <input type='text' value={routineData.name} disabled={!isEditable} />
        </div>
        <div>
          <label htmlFor="creator">Creator: </label>
          <input type='text' value={routineData.creatorName} disabled={true} />
        </div>
        <div>
          <label htmlFor="goal">Goal: </label>
          <input type='text' value={routineData.goal} disabled={!isEditable} />
        </div>
        <RoutineActivities activities={routineData.activities}/>
      </div>{
      user?.username === routineData.creatorName
      ? <div className="routine-buttons">{
        !isEditable
        ? <button onClick={ () => {setIsEditable(true)} }>Edit Routine</button>
        : <div className="edit-buttons">
            <div className="non-danger-buttons">
              <button onClick={ () => {setIsEditable(false) /* Also revert values to default */}}>Cancel</button>
              <button>Save</button> {/* Send and return changes */}
            </div>
            <div className="danger-button">
              <button onClick={handleDelete}>Delete Routine</button>
            </div>
          </div>
        }</div>
      : null
      }
    </>
  )
}

export default Routine