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

    const{ isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

  const [userLoggedIn, setUserLoggedIn] = useState(ReactSession.get("uid") != null);

    function isLoggedIn(){
        setUserLoggedIn(ReactSession.get("uid") != null);
    }
      
    function test() {
        var path = {lat: 30, lng:40} 
        // const encodeString = google.maps.spherical.computeDistanceBetween(path);
        console.log("HALLO HÆ", geometry.computeDistanceBetween(path))
    }
    
    return(
        <div className="main-view">
            <div className="map-container">
                <MapPresenter value={isLoaded}
                model={props.model} />
            </div>
            <div className="sidebar-container">
                <SidebarView
                    model = {props.model} 
                    value = {isLoaded}
                    visible = {userLoggedIn}
                    isLoggedIn  = {isLoggedIn}
                />
            </div>
            <div className="auth-container">
                <AuthenticationPresenter
                    visible = {!userLoggedIn}
                    isLoggedIn = {isLoggedIn}
                />
            </div>
        </div>
    );
}
export default MainView;