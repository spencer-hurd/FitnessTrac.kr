import { useParams } from "react-router-dom"
import RoutinesContainer from "./RoutinesContainer"

const UserRoutines = ({currentUsername}) => {
  const {username} = useParams()

  return (
    <div>{
      username 
      ? <p>{username}'s routines: </p>
      : null
    }
    <RoutinesContainer username={username||currentUsername}/>
    </div>
  )
}

export default UserRoutines