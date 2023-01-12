import { useState, useEffect, useCallback } from "react";
import { useRoutines, useUser } from "../state/context";
import { getRoutines, getUserRoutines } from "../api/fetch";
import Routine from "./Routine";

const RoutinesContainer = ({username}) => {
  const { routines, populateRoutines } = useRoutines()
  const { token, modFlag } = useUser()
  const [, updateState] = useState()
  const renderRoutines = useCallback(() => updateState({}), [])

  //fetches either routines by user or all public
  useEffect(() => {
    const fetchRoutines = async () => {
      if (username) {
        const userRoutines = await getUserRoutines(username, token)
        populateRoutines(userRoutines)
      } else {
        const freshRoutines = await getRoutines()
        populateRoutines(freshRoutines)
      }
    }
    fetchRoutines()
  }, [])

  //renders page on state.routines change
  useEffect(() => {
    renderRoutines 
  }, [modFlag])

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
    : null
  )
}

export default RoutinesContainer