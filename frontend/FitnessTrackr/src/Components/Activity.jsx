import React from "react";

const Activity = ({activity}) => {
  if (activity.routineActivityId) {return (
    <div className='activity'>
      <h4>{activity.name}</h4>
      <p>{activity.description}</p>
      <p>REPS: {activity.count}</p>
      <p>SETS/DURATION: {activity.duration}</p>
    </div>
  )}else{return (
    <div className='activity'>
      <h4>{activity.name}</h4>
      <p>{activity.description}</p>
    </div>
  )}
} 

export default Activity