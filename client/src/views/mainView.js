import React, { useEffect, useState } from "react";
import {useLoadScript} from "@react-google-maps/api";
import { ReactSession } from "react-client-session";
import { motion } from "framer-motion"
import { updateModelFromFirebase } from "../firebaseModel.js";
import ProfilePresenter from "../presenters/profilePresenter.js";
import SiteInfo from "../components/siteInfo.js";

// import { getAuth } from "@firebase/auth";
// import firebase from "firebase/compat/app";
// import firebaseConfig from "../firebaseConfig";

const MapPresenter = require("../presenters/mapPresenter.js").default;
const SidebarView = require("../views/sidebarView.js").default;
const AuthenticationPresenter = require("../presenters/authenticationPresenter").default;

const libraries = ["places", "geometry"];

function MainView(props){

  const{ isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
  });
  
  const [firstSignin, setFirstSignin] = useState(localStorage.getItem("firstSignin")=="true");
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    setUserLoggedIn(localStorage.getItem('loggedin')=="true")
  },[])

  function isLoggedIn(){
    console.log("HALLOHÆ", localStorage.getItem("firstSignin")=="true")
    console.log("HHHHHHH", firstSignin)
    setUserLoggedIn(true);
    // console.log("USER ID MODEL", localStorage.getItem("userId"))
    updateModelFromFirebase(props.model, localStorage.getItem("userId"));
  }

  function logout() {
    localStorage.removeItem('firstSignin');
    setUserLoggedIn(false);
  }

  return(
      <div className="main-view">
          <div className={ userLoggedIn ? "map-container" : "map-blur"}>
              <MapPresenter value={isLoaded}
                model={props.model}
              />
          </div>
          <div>
          </div>
          <div> {  userLoggedIn  &&
              <div 
                className="sidebar-container"
                >
                  <SidebarView
                      model = {props.model} 
                      value = {isLoaded}
                      visible = {userLoggedIn}
                      // isLoggedIn  = {isLoggedIn}
                  />
              </div>
              
              }
          </div>
          <div> {  userLoggedIn  &&
              <>
              <div className="user-container">
                <ProfilePresenter
                  model={props.model}
                  value={isLoaded}
                  // visible = {isLoggedIn}
                  // isLoggedIn  = {userLoggedIn}
                  loggedIn={userLoggedIn}
                  logout={logout} />
              </div>
            </>}
          </div>
          <div>
          {!userLoggedIn && <motion.div 
                            className="auth-container"
                            animate={{
                              scale: [1, 1, 1, 1, 1],
                              rotate: [180, 130, 80, 30, 0],
                              borderRadius: ["10%", "10%", "10%", "10%", "10%"],
                            }}
                            >
              <AuthenticationPresenter
                  visible = {!userLoggedIn}
                  isLoggedIn = {isLoggedIn}
                  // setFirstSignin={setFirstSignin}
              />
          </motion.div>}
          {firstSignin && <SiteInfo />}
          </div>
      </div>
  );
}
export default MainView;