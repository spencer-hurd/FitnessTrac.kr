import React from "react";
import ActivityForm from "./ActivityForm";

const Activity = ({activity, isCreatingRA, setIsCreatingRA, isEditable, setIsEditable, routineActivities, routineId}) => {
  if (activity?.routineActivityId || isCreatingRA) {return (
    <div className='activity'>
      <ActivityForm activity={activity} isCreatingRA={isCreatingRA} setIsCreatingRA={setIsCreatingRA} isEditable={isEditable} setIsEditable={setIsEditable} routineActivities={routineActivities} routineId={routineId}/> 
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