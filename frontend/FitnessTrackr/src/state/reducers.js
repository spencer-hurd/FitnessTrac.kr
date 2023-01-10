
//non user state
export const routineInitState = {
  routines: ["Hi i'm routino", "Howdy, I'm routina", "Yo, I'm routinx"],
  activities: [],
}

const routineReducer = (draft, action) => {
  const { type, payload } = action
  switch (type) {
    case 'populate_routines':
      draft.routines = payload
      break
    default:
      throw new Error(`No case for type ${type} found in routineReducer.`);
  }
}

export default routineReducer