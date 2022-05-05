import React, { useState } from "react";
import {useLoadScript} from "@react-google-maps/api";
import * as geometry from 'spherical-geometry-js';
import { ReactSession } from "react-client-session";

const MapPresenter = require("../presenters/mapPresenter.js").default;
const SidebarView = require("../views/sidebarView.js").default;
const SignUpPresenter = require("../presenters/signUpPresenter").default;
const LoginPresenter = require("../presenters/loginPresenter").default;
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
            <div className="map-container">
                <MapPresenter value={isLoaded}
                  model={props.model}
                  inNewTrip={inNewTrip}
                />
            </div>
            {/* <div> {  userLoggedIn  && */}
                <div className="sidebar-container">
                    <SidebarView
                        model = {props.model} 
                        value = {isLoaded}
                        visible = {isLoggedIn}
                        // visible = {true} // Change to use authentication
                        isLoggedIn  = {isLoggedIn}
                        setLoc = {setInNewTripCB}
                    />
                {/* </div> */}
                {/* } */}
            </div>
            <div>
            {!userLoggedIn && <div className="auth-container">
                <AuthenticationPresenter
                    visible = {!userLoggedIn}
                    //visible = {false} // Change to use authentication
                    isLoggedIn = {isLoggedIn}
                />
            </div>}
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