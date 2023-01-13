import { useState } from "react"

const ActivityForm = ({activity, isCreatingRA, isCreatingActivity}) => {
  const [isEditable, setIsEditable] = useState(false)
  return (
    <form>
      <div>
        <label htmlFor="activity-name"></label>
        <input type="text" defaultValue={activity.name} disabled={true}/>
      </div>
      <div>
        <label htmlFor="activity-description"></label>
        <input type="text" defaultValue={activity.description} disabled={true}/>
      </div>
      <div>
        <label htmlFor="activity-count">Reps: </label>
        <input type="text" defaultValue={activity.count} disabled={!isEditable}/>
      </div>
      <div>
        <label htmlFor="activity-duration">Sets/duration: </label>
        <input type="text" defaultValue={activity.duration} disabled={!isEditable}/>
      </div>
    </form>
  )
}

export default ActivityForm