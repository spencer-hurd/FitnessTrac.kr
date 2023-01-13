import { useEffect, useState, useRef } from "react"
import { useImmer } from "use-immer"
import { getActivities } from "../api/fetch"
import { useActivities } from "../state/context"

const blankInitData = {
  name: '',
  description: '',
  count: '',
  duration: ''
}

const ActivityForm = ({activity, isCreatingRA, isCreatingActivity, routineActivities}) => {
  // activity cases: routine-display, activities page-display, edit on routine, edit alone, add on routine (pull from available activities), add to activities
  const [isEditable, setIsEditable] = useState(false)
  const { activities, populateActivities } = useActivities()
  const [activityData, setActivityData] = useImmer(blankInitData)
  const countRef = useRef()
  const durationRef = useRef()

  //set the routine activity display case
  useEffect(() => {
    if(activity) {
      setActivityData(activity)
    }
  }, [])
  
  //TODO: filter activities by routine
  useEffect(() => {
    const fetchActivities = async () => {
      const freshActivities = await getActivities()
      if (!routineActivities) {
        populateActivities(freshActivities)
      } else {
        console.log(activities)
        const filteredActivities = freshActivities.filter(activity => {
          return !routineActivities.includes(activity.id)
        })
        populateActivities(filteredActivities)
      }
      //console.log('ids: ', routineActivityIds, ' freshActivities: ', freshActivities, ' filteredActivities: ', filteredActivities)
    }
    fetchActivities()
  }, [])

  function handleSelectChange(e) {
    //This is very confusing i'm sorry i'm in pain
    const activity = JSON.parse(JSON.stringify(activities.find(activity => (activity.id === +e.target.value))));
    activity.count = ''
    activity.duration = ''
    setActivityData(activity)
    console.dir(activityData)
  }

  async function handleFormSubmit () {
    //conditional for adding activity or modifying one
  }

  return (
    /* Display form and edit */
    <form>
      <div>
        <label htmlFor="activity-name"></label>
        {isCreatingRA 
        ? <select name="activity-names" id="activity-names" onChange={(e) => {handleSelectChange(e)}}>{
          activities?.map(activity => {
            return (
              <option key={activity.id} value={activity.id}>{activity.name}</option>
            )
          })
          }</select> 
        : <input type="text" defaultValue={activityData.name} disabled={true}/>}
      </div>
      <div>
        <label htmlFor="activity-description"></label>
        <input type="text" defaultValue={activityData.description} disabled={true}/>
      </div>
      <div>
        <label htmlFor="activity-count">Reps: </label>
        <input type="text" ref={countRef} defaultValue={activityData.count} disabled={!isEditable}/>
      </div>
      <div>
        <label htmlFor="activity-duration">Sets/duration: </label>
        <input type="text" ref={durationRef} defaultValue={activityData.duration} disabled={!isEditable}/>
      </div>
    </form> 
  )
}

export default ActivityForm