import { useLoaderData } from "react-router-dom"
import RoutinesContainer from "./RoutinesContainer"

const RoutinesByActivity = () => {
    const activity = useLoaderData()
    
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