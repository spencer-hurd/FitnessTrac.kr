import { useUser } from "../state/context"
import UserRoutines from "./UserRoutines"
import { fetchMe } from "../api/auth"

const MyRoutines = () => {
  const { user, token } = useUser()
  let username

  //for security purposes, make sure the local user can be auth'd on this page
  //one could simply add a user to localStorage and refresh the page to gain access to a user's private posts otherwise
  async function compareUserToDB() {
    const DBUser = await fetchMe(token)
    if (DBUser.username === user.username) {
      return true
    } else {
      alert('Local user cannot be authenticated')
      return false
    }
  }

  compareUserToDB() ? username = user.username : null

  return (
    <div> 
      <p>These are your routines {username}!</p>
      <UserRoutines currentUsername={username}/>
    </div>
  )
}

export default MyRoutines