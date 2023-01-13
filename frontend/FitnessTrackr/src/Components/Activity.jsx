import React from "react";
import ActivityForm from "./ActivityForm";

const Activity = ({activity, isCreatingRA}) => {
  if (activity.routineActivityId) {return (
    <div className='activity'>
      <ActivityForm activity={activity} isCreatingRA={isCreatingRA}/>
    </div>
  )}
  
  
  
  
  else{return (
    <div className='activity'>
      <h4>{activity.name}</h4>
      <p>{activity.description}</p>
    </div>
  )}
} 

export default Activity