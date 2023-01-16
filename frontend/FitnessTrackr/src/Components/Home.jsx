import { Outlet } from "react-router-dom";
import { useUser } from "../state/context";
import Header from "./Header";

import './Styles/Home.css'
import SideNav from "./SideNav";

const Home = () => {
  const { user } = useUser()
  
  return (
    <>
      <SideNav user={user}/>
      <div className="main-content">
        <div className="head-container">
          <Header />
          {
            !user
            ?<>
               <div className="home-splash">
                <h3>Welcome to fitnesstrac.kr. Sign in or sign up to make your own routines!</h3>
              </div>
            </>
            : null
          }
        </div>
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Home