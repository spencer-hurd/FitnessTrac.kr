import React from "react";
import Activity from "./Activity";

const RoutineActivities = ({activities}) => {
  return (
    <div className="routine-activities">
      <h4>Activities: </h4>
      <ul>{
        activities?.map(activity => {
          return (
          <li className="routine-activity" key={activity.id}>
            <Activity activity={activity}/>
          </li>
          )
        })
      }</ul>
    </div>
  )
}

export default RoutineActivities