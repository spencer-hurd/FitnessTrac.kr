import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import { RoutineProvider, ActivitiesProvider, UserProvider} from './state/context'
import { getActivities } from './api/fetch'
import { Home, Routines, Activities } from './Components'
import MyRoutines from './Components/MyRoutines'
import UserRoutines from './Components/UserRoutines'
import RoutinesByActivity from './Components/RoutinesByActivity'
import Welcome from './Components/Welcome'

import './App.css'

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
      <Route path='welcome' element={<Welcome />}/>
    </Route>
  )
)


function App() {

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
