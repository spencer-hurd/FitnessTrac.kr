import { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";
import { routineInitState, routineReducer, activitiesInitState, activitiesReducer, userInitState, userReducer } from "./reducers";

const RoutineContext = createContext(routineInitState)
const ActivitiesContext = createContext(activitiesInitState)
const UserContext = createContext(userInitState)

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

export const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error("useUser must be used within UserContext")
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

export const UserProvider = ({children}) => {
  const [state, dispatch] = useImmerReducer(userReducer, userInitState)

  const setUser = (user) => {
    dispatch({
      type: 'set_user',
      payload: user
    })
  }

  const setToken = (token) => {
    dispatch({
      type: 'set_token',
      payload: token
    })
  }
  const value = {
    user: state.user,
    token: state.token,
    setUser,
    setToken
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}