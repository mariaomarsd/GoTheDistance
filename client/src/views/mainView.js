import React, { useEffect, useState } from "react";
import {useLoadScript} from "@react-google-maps/api";
import { ReactSession } from "react-client-session";
import { motion } from "framer-motion"
import { updateModelFromFirebase } from "../firebaseModel.js";
import ProfilePresenter from "../presenters/profilePresenter.js";
// import { getAuth } from "@firebase/auth";
// import firebase from "firebase/compat/app";
// import firebaseConfig from "../firebaseConfig";

const MapPresenter = require("../presenters/mapPresenter.js").default;
const SidebarView = require("../views/sidebarView.js").default;
const AuthenticationPresenter = require("../presenters/authenticationPresenter").default;

// firebase.initializeApp(firebaseConfig);
// const auth = getAuth();

const libraries = ["places", "geometry"];

function MainView(props){

  const{ isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

  // const [userLoggedIn, setUserLoggedIn] = useState(ReactSession.get("uid") != null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  // const [username, setUsername] = useState("");

  useEffect(() => {
    setUserLoggedIn(localStorage.getItem('loggedin')=="true")
  },[])

  function isLoggedIn(){
      setUserLoggedIn(true);
      // props.model.signIn(ReactSession.get("uid"));
      console.log("USER ID MODEL", localStorage.getItem("userId"))
      updateModelFromFirebase(props.model, localStorage.getItem("userId"));
      // setUsername(ReactSession.get("uid"))
      // console.log("session", ReactSession.get("uid"));
      // console.log("model", ReactSession.get("uid"));
      // console.log('USERNAME', username)
    }

  function logout() {
    setUserLoggedIn(false);
  }

  return(
      <div className="main-view">
          <div className={ userLoggedIn ? "map-container" : "map-blur"}>
              <MapPresenter value={isLoaded}
                model={props.model}
              />
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
              <div className="user-container">
                  <ProfilePresenter
                      model = {props.model} 
                      value = {isLoaded}
                      // visible = {isLoggedIn}
                      // isLoggedIn  = {userLoggedIn}
                      loggedIn={userLoggedIn}
                      logout={logout}
                  />
              </div>
              
              }
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
              />
          </motion.div>}
          </div>
      </div>
  );
}
export default MainView;