import {React, useEffect} from "react";
import { useRoutines } from "../state/context";
import { getRoutines } from "../api/fetch";
import Routine from "./Routine";

const RoutinesContainer = () => {
  const {routines, populateRoutines} = useRoutines()

  useEffect(() => {
    const fetchRoutines = async () => {
      const freshRoutines = await getRoutines()
      populateRoutines(freshRoutines)
    }
    fetchRoutines()
  }, [])

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