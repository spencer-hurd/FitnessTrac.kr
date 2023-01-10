import { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";
import { routineInitState } from "./reducers";
import routineReducer from "./reducers";

const RoutineContext = createContext(routineInitState)

const useRoutines = () => {
  const context = useContext(RoutineContext)

  if (context === undefined) {
    throw new Error("useRoutines must be used within RoutineContext")
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

export default useRoutines