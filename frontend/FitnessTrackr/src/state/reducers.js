//non user state
export const routineInitState = {
  routines: [],
  activities: [],
}

export const activitiesInitState = {
  activities: []
}

export const userInitState = {
  user: JSON.parse(window.localStorage.getItem('user')),
  token: window.localStorage.getItem('token'),
  modFlag: 0
}

export const routineReducer = (draft, action) => {
  const { type, payload } = action
  switch (type) {
    case 'populate_routines':
      draft.routines = payload
      break
    case 'add_routine':
      draft.routines.push(payload)
      break
    case 'remove_routine':
      // payload === routine.id
      draft.routines = draft.routines.filter(routine => routine.id !== payload)
      break
    default:
      throw new Error(`No case for type ${type} found in routineReducer.`)
  }
}

export const activitiesReducer = (draft, action) => {
  const { type, payload } = action
  switch (type) {
    case 'populate_activities':
      draft.activities = payload
      break
    default:
      throw new Error(`No case for type ${type} found in activitiesReducer.`)
  }
}

export const userReducer = (draft, action) => {
  const { type, payload } = action
  switch (type) {
    case 'set_user':
      draft.user = payload
      break
    case 'set_token':
      draft.token = payload
      break
    case 'increment_flag':
      draft.modFlag++
      break
    default:
      throw new Error(`No case for type ${type} found in userReducer.`)
  }
}