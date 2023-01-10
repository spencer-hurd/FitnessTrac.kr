import { RoutineProvider, ActivitiesProvider } from './state/context'
import { Routes, Route } from 'react-router-dom'
import { Header, Home, Routines, Activities } from './Components'

import './App.css'

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
      //userId - routines from -> /users/:username/routines -- visual distinction for private routines -- sugar on top :3
        //Reuse RoutinesContainer etc.
    //Activities - shows all activities - form for new activity if logged in
      //ActivitiesContainer - Think of a different way to format these when solo
      //CreateActivityForm
  return (
    <RoutineProvider>
      <ActivitiesProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/routines' element={<Routines />}/>
          <Route path='/activities' element={<Activities />}/>
        </Routes>
      </div>
      </ActivitiesProvider>
    </RoutineProvider>
  )
}

export default App
