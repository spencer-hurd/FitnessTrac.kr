import { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";
import { routineInitState, routineReducer, activitiesInitState, activitiesReducer } from "./reducers";

const RoutineContext = createContext(routineInitState)
const ActivitiesContext = createContext(activitiesInitState)

export const useRoutines = () => {
  const context = useContext(RoutineContext)

  if (context === undefined) {
    throw new Error("useRoutines must be used within RoutineContext")
  }

  return context
}

export const useActivities = () => {
  const context = useContext(ActivitiesContext)

  if (context === undefined) {
    throw new Error("useActivities must be used within ActivitiesContext")
  }

  return context
}

export const RoutineProvider = ({children}) => {
  const [state, dispatch] = useImmerReducer(routineReducer, routineInitState)

  //add types for different routine list needs e.g. getAllPublicRoutines, addRoutineToState, removeRoutineFromState, updateRoutine
  const populateRoutines = (routineList) => {
    dispatch({
      type: 'populate_routines',
      payload: routineList
    })
  }

  const value = {
    routines: state.routines,
    populateRoutines
  }
  return <RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>
}

export const ActivitiesProvider = ({children}) => {
  const [state, dispatch] = useImmerReducer(activitiesReducer, activitiesInitState)

  const populateActivities = (activitiesList) => {
    dispatch({
      type: 'populate_activities',
      payload: activitiesList
    })
  }

  const value = {
    activities: state.activities,
    populateActivities
  }
  return <ActivitiesContext.Provider value={value}>{children}</ActivitiesContext.Provider> 
}