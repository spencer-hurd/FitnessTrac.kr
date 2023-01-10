import {React, useEffect} from "react";
import { useActivities } from "../state/context";
import { getActivities } from "../api/fetch";
import Activity from "./Activity"

import './Styles/Activities.css'

const Activities = () => {
  const {activities, populateActivities} = useActivities()

  useEffect(() => {
    const fetchActivities = async () => {
      const freshActivities = await getActivities()
      populateActivities(freshActivities)
    }
    fetchActivities()
  }, [])

  return (
    activities.length > 0
    ? <div className="activities-container">{
      activities.map((activity) => {
        return (
          <div className="activity-card" key={activity.id}>
            <Activity activity={activity}/>
          </div>
        )
      })
    }</div>
    : null
  )
}

export default Activities