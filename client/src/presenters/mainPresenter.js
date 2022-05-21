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
          logout={logout}
        />
        <InfoMark showInfo={showInfo}/> </> 
      : <AuthenticationPresenter visible={!userLoggedIn} isLoggedIn={isLoggedIn} /> }
      {signup && <SiteInfo click={continueSignup}/>}
    </div>
  );
}
export default MainPresenter;