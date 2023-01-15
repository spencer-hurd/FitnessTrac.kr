import { useState, useEffect, useCallback } from "react";
import { useRoutines, useUser } from "../state/context";
import { getRoutines, getUserRoutines, getRoutinesByActivity } from "../api/fetch";
import Routine from "./Routine";
import './Styles/RoutinesContainer.css'

const RoutinesContainer = ({username, activityId}) => {
  const { routines, populateRoutines } = useRoutines()
  const { token, modFlag } = useUser()
  //fetches either routines by user or all public
  useEffect(() => {
    const fetchRoutines = async () => {
      if (username) {
        const userRoutines = await getUserRoutines(username, token)
        populateRoutines(userRoutines)
      }else if (activityId){
        const routinesByActivity = await getRoutinesByActivity(activityId)
        console.log(routinesByActivity)
        populateRoutines(routinesByActivity)
      }else {
        const freshRoutines = await getRoutines()
        populateRoutines(freshRoutines)
      }
    }
    fetchRoutines()
  }, [])

  //renders page on state.routines change
  //no need!!
  /* useEffect(() => {
    renderRoutines 
  }, [modFlag]) */

  return (
    routines.length > 0
    ? <div className="routines-container">{
      routines.map((routine) => {
        return (
          <div className="routine-card" key={routine.id}>
            <Routine routineData={routine}/>
          </div>
        )
      })
    }</div>
    : <p>No routines to show muchacho!</p>
  )
}

export default RoutinesContainer