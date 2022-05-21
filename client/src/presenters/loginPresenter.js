import React, { useState } from "react";
import LoginView from "../views/loginView";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebaseConfig";
import { ReactSession } from "react-client-session";

firebase.initializeApp(firebaseConfig);

const auth = getAuth();

function LoginPresenter(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    function updateEmailCB(newEmail){
        setEmail(newEmail);
    }

    function updatePasswordCB(newPassword){
        setPassword(newPassword);
    }

    function loginCB(){
        function signIn(userCredential){
            const uid = userCredential.user.uid;
            const uName = userCredential.user.displayName;
            props.model.saveUserInfo({loggedin: true, username: uName, userId: uid, firstSignin: false});
            ReactSession.set("uid", uid);
            ReactSession.set("uName", uName);
        }

        function handleError(error) {
            const errorCode = error.code;
            if(errorCode === "auth/invalid-email") {
                setErrorMessage("Please enter a valid email address");
            }
            else if(errorCode === "auth/user-not-found") {
                setErrorMessage("There is no accound associated with this email address");
            }
            else if(errorCode === "auth/wrong-password") {
                setErrorMessage("Wrong password");
            }
            else {
                setErrorMessage(errorCode);
            }
        }

        if(password !== "") {
            signInWithEmailAndPassword(auth, email, password)
            .then(signIn)
            .then(props.isLoggedIn)
            .catch(handleError);
        }   
        else {
            setErrorMessage("Type password")
        }
    }

    return(
        <LoginView 
            login =  {loginCB}
            email =  {email}
            updateEmail = {updateEmailCB}
            password =  {password}
            updatePassword = {updatePasswordCB}
            errorMessage = {errorMessage}
            toggle = {props.toggle}
        />
    );
}

export default LoginPresenter;
