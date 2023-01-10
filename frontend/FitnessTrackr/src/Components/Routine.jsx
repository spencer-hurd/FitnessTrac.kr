import React from "react";

const Routine = ({routineData}) => {
  return (
    <>
      <div className="routineCard">
        <p>{routineData.name}</p>
        <p>{routineData.creatorName}</p>
        <p>{routineData.goal}</p>
      </div>
    </>
  )
}

export default Routine