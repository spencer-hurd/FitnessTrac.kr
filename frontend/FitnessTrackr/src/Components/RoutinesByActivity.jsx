import { useEffect } from "react"
import { getRoutinesByActivity } from "../api/fetch"
import { useActivities } from "../state/context"
import { useLocation, useParams } from "react-router-dom"
import RoutinesContainer from "./RoutinesContainer"
const RoutinesByActivity = () => {
    const activityId = useParams()
    return (
        <div>{
            activityId
            ? <p>Routines with that activity: </p>
            : null
        }
        <RoutinesContainer activityId={activityId}/>
        </div>
    )
}

export default RoutinesByActivity