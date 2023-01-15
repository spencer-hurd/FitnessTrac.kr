import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, redirect } from 'react-router-dom'
import { RoutineProvider, ActivitiesProvider, UserProvider} from './state/context'
import { Home, Routines, Activities } from './Components'

import './App.css'
import MyRoutines from './Components/MyRoutines'
import UserRoutines from './Components/UserRoutines'
import RoutinesByActivity from './Components/RoutinesByActivity'
import { getActivities } from './api/fetch'

const routinesByActivityLoader = async ({params}) => {
  const activities = await getActivities()
  const [match] = activities.filter(activity => activity.id === +params.activityId)
  return match
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Home />} >
      <Route path='routines' element={<Routines />}/>
      <Route path='activities' element={<Activities />}/>
      <Route path='my-routines' element={<MyRoutines />}/>
      <Route path='user/:username' element={<UserRoutines />}/>
      <Route path='activities/:activityId/routines' element={<RoutinesByActivity />} loader={routinesByActivityLoader}/>
    </Route>
  )
)


function App() {

  //ROUTES
    //Home - Routines but with an info header or something
    //AuthPage -> Points to either register or sign in - swap the form based on the URL - probably a fly-in or modal
    //Routines - All public routines -- usernames link to -> /users/:username/routines -- activities link to -> /activities/:activityId/routines
      //RoutinesContainer - modular container for easy display of different routines
        //Routine - Individual Routine to display with activities -- Options for editing if owned
          //Activites - Maps over activites for that routine - allows for simple editing of routines
      //CreateRoutineForm - probably another modal
    //users -- points to either selected user's page or auth'd current user's profile
      //username - routines from -> /users/:username/routines -- visual distinction for private routines -- sugar on top :3
        //Reuse RoutinesContainer etc.
    //Activities - shows all activities - form for new activity if logged in
      //ActivitiesContainer - Think of a different way to format these when solo
      //CreateActivityForm

  return (
    <RoutineProvider>
      <UserProvider>
        <ActivitiesProvider>
          <div className="App">
            <RouterProvider router={router}/>
          </div>
        </ActivitiesProvider>
      </UserProvider>
    </RoutineProvider>
  )
}

export default App
