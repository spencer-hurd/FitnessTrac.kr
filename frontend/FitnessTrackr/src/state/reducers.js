//non user state
export const routineInitState = {
  routines: [],
  activities: [],
}

export const activitiesInitState = {
  activities: []
}

export const userInitState = {
  user: {},
  token: ''
}

export const routineReducer = (draft, action) => {
  const { type, payload } = action
  switch (type) {
    case 'populate_routines':
      draft.routines = payload
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
    default:
      throw new Error(`No case for type ${type} found in userReducer.`)
  }
}