import { useState } from "react";
import Activity from "./Activity";

const RoutineActivities = ({activities, isAuthor, routineId}) => {
  const [isEditable, setIsEditable] = useState(false)
  const [isCreatingRA, setIsCreatingRA] = useState(false)

  return (
    <div className="routine-activities">
      <div className="ra-header">
        <h4>Activities: </h4>
        {isAuthor
        ? isEditable 
          ? <button onClick={() => {setIsEditable(!isEditable); setIsCreatingRA(false)}}>Close Edit</button>
          : <button onClick={() => {setIsEditable(!isEditable)}}>Edit Activities</button>
        : null
        }
      </div>
      <ul>{
        activities?.map(activity => {
          return (
          <li className="routine-activity" key={activity.id}>
            <Activity activity={activity} isEditable={isEditable} setIsEditable={setIsEditable} routineId={routineId}/>
          </li>
          )
        })
      }
      { 
      isCreatingRA
      ? <Activity isCreatingRA={isCreatingRA} setIsCreatingRA={setIsCreatingRA} routineActivities={activities} routineId={routineId}/>
      : null
      }
      </ul>{
      isEditable
      ? isCreatingRA 
        ? <button onClick={() => setIsCreatingRA(false)}>Cancel</button>  
        : <button onClick={() => setIsCreatingRA(true)} className="add-activity-to-routine">&#8862;</button>
      : null
      }
    </div>
  )
}

export default RoutineActivities