import React, { useState } from "react";
import Activity from "./Activity";

const RoutineActivities = ({activities, isAuthor}) => {
  const [isEditable, setIsEditable] = useState(false)
  const [isCreatingRA, setIsCreatingRA] = useState(false)

  return (
    <div className="routine-activities">
      <div className="ra-header">
        <h4>Activities: </h4>
        {isAuthor
        ? <button onClick={() => {setIsEditable(!isEditable)}}>Edit Activities</button>
        : null
        }
      </div>
      <ul>{
        activities?.map(activity => {
          return (
          <li className="routine-activity" key={activity.id}>
            <Activity activity={activity}/>
          </li>
          )
        })
      }
      {
      isCreatingRA
      ? <Activity isCreatingRA={isCreatingRA}/>
      : null
      }
      </ul>{
      isEditable
      ? <button onClick={() => setIsCreatingRA(true)} className="add-activity-to-routine">&#8862;</button>
      : null
      }
    </div>
  )
}

export default RoutineActivities