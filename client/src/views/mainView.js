import React, { useState } from "react";
import {useLoadScript} from "@react-google-maps/api";
import { ReactSession } from "react-client-session";
import { motion } from "framer-motion"
import { updateModelFromFirebase } from "../firebaseModel.js";

const MapPresenter = require("../presenters/mapPresenter.js").default;
const SidebarView = require("../views/sidebarView.js").default;
const AuthenticationPresenter = require("../presenters/authenticationPresenter").default;

const libraries = ["places", "geometry"];

function MainView(props){

  const [inNewTrip, setInNewTrip] = useState(false);

  const{ isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

  const [userLoggedIn, setUserLoggedIn] = useState(ReactSession.get("uid") != null);

    function isLoggedIn(){
        setUserLoggedIn(ReactSession.get("uid") != null);
        // props.model.signIn(ReactSession.get("uid"));
        updateModelFromFirebase(props.model, ReactSession.get("uid"));
        console.log("session", ReactSession.get("uid"));
        console.log("model", ReactSession.get("uid"));
    }

    function setInNewTripCB(id){
      if(id === 1) {
        setInNewTrip(true)
      }
      else{
        setInNewTrip(false)
      }
    }

    return(
        <div className="main-view">
            <div className={ userLoggedIn ? "map-container" : "map-blur"}>
                <MapPresenter value={isLoaded}
                  model={props.model}
                  inNewTrip={inNewTrip}
                />
            </div>
            <div> {  userLoggedIn  &&
                <div className="sidebar-container">
                    <SidebarView
                        model = {props.model} 
                        value = {isLoaded}
                        visible = {isLoggedIn}
                        isLoggedIn  = {isLoggedIn}
                        setLoc = {setInNewTripCB}
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

/*
  "rules": {
    "users": {
       "$uid": {
         // Allow only authenticated content owners access to their data
         ".read": "auth != null && auth.uid == $uid" ,
         ".write": "auth != null && auth.uid == $uid"
       }
     },
     "gothedistance": {
       "$uid": {
         // Allow only authenticated content owners to write to their data, all authenticated can read (e.g. forum posts)
         ".read": "auth != null" ,
         ".write": "auth != null && auth.uid == $uid"
       }
     }
  }
*/