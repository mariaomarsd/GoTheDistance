import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebaseConfig";
import { ReactSession } from "react-client-session";

const ProfileView = require("../views/profileView.js").default;

firebase.initializeApp(firebaseConfig);
const auth = getAuth();

function ProfilePresenter(props) {

    const [isVisible, setIsVisible] = useState();
    const [loggedIn, setLoggedIn] = useState(ReactSession.get("uName"));

    function setVisibleCB() {
        props.setVisible(3)
        setIsVisible(props.visible[3]);
        setLoggedIn(ReactSession.get("uName"));
    }

    function removeCredentialsCB(){
        ReactSession.set("uid", null);
        ReactSession.set("uName", null);
        setLoggedIn(ReactSession.get("uName"));
    }

    function signoutCB() {
        signOut(auth)
            .then(removeCredentialsCB)
            .then(props.isLoggedIn)
            .catch((error) => {console.log("error", error.message)});
    }

    function loginCB(){
        
    }

    return(
        <div className="profile-presenter">
            <div className="sidebar-titles" onClick={setVisibleCB}>
                PROFILE
            </div>
            <div>
                {isVisible && 
                <ProfileView 
                    signout = {signoutCB}
                    loggedInUser = {loggedIn}
                    login = {loginCB}
                />}
            </div>
        </div>
    );
}

export default ProfilePresenter;
