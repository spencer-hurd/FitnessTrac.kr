import React from "react";
import Routines from "./Routines";

const Home = () => {
  //Floating splash???
  return (
    <>
      <div className="home-splash">
        <h3>Welcome to fitnesstrac.kr. Sign in or sign up to make your own routines!</h3>
      </div>
      
      <Routines />
    </>
  )
}

export default Home