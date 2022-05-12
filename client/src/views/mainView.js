import React, { useEffect, useState } from "react";
import {useLoadScript} from "@react-google-maps/api";
import { motion } from "framer-motion"
import { updateModelFromFirebase } from "../firebaseModel.js";
import ProfilePresenter from "../presenters/profilePresenter.js";
import SiteInfo from "../components/siteInfo.js";

const MapPresenter = require("../presenters/mapPresenter.js").default;
const SidebarView = require("../views/sidebarView.js").default;
const AuthenticationPresenter = require("../presenters/authenticationPresenter").default;

const libraries = ["places", "geometry"];

function MainView(props){

  const [signup, setSignup] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    setUserLoggedIn(localStorage.getItem('loggedin')==="true")
  },[])

  const{ isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
  });
  
  function isLoggedIn(){
    setUserLoggedIn(true);
    setSignup(localStorage.getItem("firstSignin")==="true");
    updateModelFromFirebase(props.model, localStorage.getItem("userId"));
  }

  function logout() {
    props.model.logout();
    setUserLoggedIn(false);
    localStorage.clear()
  }

  function continueSignup() {
    setSignup(false)
  }

  function showInfo() {
    setSignup(!signup)
  }

  return(
    <div className="main-view">
      <div className={ userLoggedIn ? "map-container" : "map-blur"}>
          <MapPresenter value={isLoaded} model={props.model} />
      </div>
      <div className="logo">GO THE DISTANCE
        <div className="logo-icon">
          <i className="fa-solid fa-paper-plane"></i>
        </div>
      </div>
      <div> {  userLoggedIn  && <>
        <div className="sidebar-container">
          <SidebarView
            model={props.model}
            value={isLoaded}
            visible={userLoggedIn} />
        </div>
        <div>
          <div className="user-container">
            <ProfilePresenter
              model={props.model}
              value={isLoaded}
              loggedIn={userLoggedIn}
              logout={logout} />
          </div>
          <motion.div className="info"
              onClick={showInfo}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.95 }}>
            <i className="fa-regular fa-circle-question" style={{ color: "rgb(85, 55, 46)" }}></i>
          </motion.div>
        </div></>}
        <div> {!userLoggedIn && <motion.div 
                          className="auth-container"
                          animate={{
                            scale: [1, 1, 1, 1, 1],
                            rotate: [180, 130, 80, 30, 0],
                            borderRadius: ["10%", "10%", "10%", "10%", "10%"],
                          }} >
          <AuthenticationPresenter visible = {!userLoggedIn} isLoggedIn = {isLoggedIn} />
          </motion.div>}
        {signup && <SiteInfo click={continueSignup}/>}
        </div>
      </div>
    </div>
  );
}
export default MainView;