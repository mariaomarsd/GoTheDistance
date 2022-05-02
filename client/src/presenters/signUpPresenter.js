import React, { useState } from "react";
import SignUpView from "../views/signUpView";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebaseConfig";
import { ReactSession } from "react-client-session";

// const TripsModel = require("../tripsModel.js").default;
// const tripsModel= new TripsModel();

let firebaseModel = require("../firebaseModel");
const {updateFirebaseFromModel, updataModelFromFirebase} = firebaseModel;

firebase.initializeApp(firebaseConfig);
const auth = getAuth();


function SignUpPresenter(props){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [displayErrorMessage, setDiplayErrorMessage] = useState("");

    function updateUsername(newUserName) {
        setUsername(newUserName);
        console.log("username", username);
    }

    function updateEmail(newEmail){
        setEmail(newEmail);
    }

    function updatePassword(newPassword) {
        setPassword(newPassword);
    }

    function updateConfirmPassword(newConfirmPassword){
        setConfirmPassword(newConfirmPassword);
    }

    function createUser(event){
        function setUserCredentials(userCredential){
            const userId = userCredential.user.uid;
            ReactSession.set("uid", userId);
            ReactSession.set("uName", username);
            console.log("uid", ReactSession.get("uid"));
            console.log("username", ReactSession.get("uName"));
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setDiplayErrorMessage("");
       }
       
       function handleError(error) {
           const errorCode = error.code;
           if(errorCode === "auth/invalid-email") {
            setDiplayErrorMessage("This email address is invalid");
            }
            else if(errorCode === "auth/email-already-in-use") {
                setDiplayErrorMessage("This email address is already in use");
            }
            else if(errorCode ===  "auth/weak-password") {
                setDiplayErrorMessage("The password has to be at least 6 characters long");
            }
            else {
                setDiplayErrorMessage(error.message);
           }
       }

        if(username !== "" && email !=="" && password !== "" && password === confirmPassword){
            createUserWithEmailAndPassword(auth, email, password)
                .then(setUserCredentials)
                .catch(handleError);
        }
        else if(username === ""){
            setDiplayErrorMessage("enter a username");
        }
        else if(email === ""){
            setDiplayErrorMessage("enter an email address");
        }
        else if(password === ""){
            setDiplayErrorMessage("enter a password");
        }
        else {
            setDiplayErrorMessage("the passwords don't match")
        }
    }
    
    return(
        <div>
            <SignUpView
                username = {username}
                updateUsername = {updateUsername}
                email = {email}
                updateEmail = {updateEmail}
                password = {password}
                updatePassword = {updatePassword}
                confirmPassword = {confirmPassword}
                updateConfirmPassword = {updateConfirmPassword} 
                createUser = {createUser}
                displayErrorMessage = {displayErrorMessage}
            />
        </div>
    );

}

export default SignUpPresenter;