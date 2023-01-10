import React from "react";
import Routine from "./Routine";
import useRoutines from "../state/context";

const RoutinesContainer = () => {
  const {routines, populateRoutines} = useRoutines()

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