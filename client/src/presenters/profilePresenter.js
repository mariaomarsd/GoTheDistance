import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebaseConfig";
// import { ReactSession } from "react-client-session";

const ProfileView = require("../views/profileView.js").default;



firebase.initializeApp(firebaseConfig);
const auth = getAuth();

function ProfilePresenter(props) {

    const [isVisible, setIsVisible] = useState();

    function signoutCB() {
         signOut(auth)
            .then(props.logout)
            .catch((error) => {console.log("error", error.message)});
    }

    return(
        <div className="user-view">
            <ProfileView 
                signout = {signoutCB}
                loggedInUser={props.loggedIn}
                // login = {loginCB}
            />
        </div>
    );
}

export default ProfilePresenter;
