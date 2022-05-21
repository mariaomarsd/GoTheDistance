import React, { useEffect, useState } from "react";
import {useLoadScript} from "@react-google-maps/api";
import { updateModelFromFirebase } from "../firebaseModel.js";
import SiteInfo from "../components/siteInfo.js";
import Logo from "../components/logo.js";
import InfoMark from "../components/infoMark.js";

const MapPresenter = require("./mapPresenter.js").default;
const SidebarPresenter = require("./sidebarPresenter.js").default;
const AuthenticationPresenter = require("./authenticationPresenter").default;
const ProfilePresenter = require("./profilePresenter.js").default;

const libraries = ["places", "geometry"];

function MainPresenter(props){

  const [signup, setSignup] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  // const [user, setUser] = useState(props.model.getUser())

  useEffect(() => {
    setUserLoggedIn(props.model.getUser().loggedin==="true")
  },[])

  const{ isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
  });
  
  function isLoggedIn(){
    setUserLoggedIn(true);
    setSignup(props.model.getUser().firstSignin==="true");
    updateModelFromFirebase(props.model, props.model.getUser().userId);
  }

  function logout() {
    props.model.logout();
    setUserLoggedIn(false);
  }

  function continueSignup() {
    setSignup(false)
  }

  function showInfo() {
    setSignup(!signup)
  }

  return(
    <div className="main-view">
      <MapPresenter value={isLoaded} model={props.model} userLoggedIn={userLoggedIn}/>
      <Logo/>
      { userLoggedIn ? <>
        <SidebarPresenter
          model={props.model}
          value={isLoaded}
          visible={userLoggedIn}
        />
        <ProfilePresenter
          model={props.model}
          value={isLoaded}
          loggedIn={userLoggedIn}
          userName={props.model.getUser().username}
          logout={logout}
        />
        <InfoMark showInfo={showInfo}/> </> 
      : <AuthenticationPresenter model={props.model} visible={!userLoggedIn} isLoggedIn={isLoggedIn} /> }
      {signup && <SiteInfo click={continueSignup}/>}
    </div>
  );
}
export default MainPresenter;