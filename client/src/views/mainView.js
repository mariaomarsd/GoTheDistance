import React, { useState } from "react";
import {useLoadScript} from "@react-google-maps/api";
import { ReactSession } from "react-client-session";

const MapPresenter = require("../presenters/mapPresenter.js").default;
const SidebarView = require("../views/sidebarView.js").default;
const SignUpPresenter = require("../presenters/signUpPresenter").default;
const LoginPresenter = require("../presenters/loginPresenter").default;
const AuthenticationPresenter = require("../presenters/authenticationPresenter").default;

const libraries = ["places"];

function MainView(props){

    const{ isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [userLoggedIn, setUserLoggedIn] = useState(ReactSession.get("uid") != null);

    function isLoggedIn(){
        setUserLoggedIn(ReactSession.get("uid") != null);
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
            {/* <div className="signup-container">
                <SignUpPresenter 
                    model = {props.model}
                    visible = {false}
                />
            </div>
            <div className="login-container">
                <LoginPresenter
                    model = {props.model}
                    visible = {false}
                />
          </div> */}
        </div>
    );
}
export default MainView;