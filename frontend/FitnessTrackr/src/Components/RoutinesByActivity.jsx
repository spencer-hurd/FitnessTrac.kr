import { useEffect } from "react"
import { getRoutinesByActivity } from "../api/fetch"
import { useActivities } from "../state/context"
import { useLoaderData, useParams } from "react-router-dom"
import RoutinesContainer from "./RoutinesContainer"
const RoutinesByActivity = () => {
    const activity = useLoaderData()
    console.log('passed from loader: ', activity)
    return (
        <div>{
            activity.id
            ? <p>Routines with {activity.name}:  </p>
            : null
        }
        <RoutinesContainer activityId={activity.id}/>
        </div>
    )
}

export default RoutinesByActivity