import {React, useEffect} from "react";
import useRoutines from "../state/context";
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
    <div className="routines-container">{
      routines.map((routine, index) => {
        return (
          <div className="routine-holder" key={index}>
            <Routine routineData={routine}/>
          </div>
        )
      })
    }</div>
  )
}

export default RoutinesContainer