import { useParams } from "react-router-dom"
import { getUserRoutines } from "../api/fetch"
import RoutinesContainer from "./RoutinesContainer"

const UserRoutines = ({currentUsername}) => {
  const {username} = useParams()

  async function loadUserRoutines () {
    const userRoutines = await getUserRoutines(username||currentUsername)

  }
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