import React from "react";
import RoutineActivities from "./RoutineActivities";

const Routine = ({routineData}) => {
  return (
    <>
      <h3>{routineData.name}</h3>
      <p>Creator: {routineData.creatorName}</p>
      <p>{routineData.goal}</p>
      <RoutineActivities activities={routineData.activities}/>
    </>
  )
}

export default Routine