import React, { useReducer, useState } from "react";
import LoginView from "../views/loginView";
import { 
    getAuth,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
    onAuthStateChanged
} from "firebase/auth";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebaseConfig";
import { ReactSession } from "react-client-session";


firebase.initializeApp(firebaseConfig);
const auth = getAuth();

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const uid = user.uid;
//       // ...
//       console.log('WORKS', uid)
//     } else {
//       // User is signed out
//       // ...
//     }
//   });

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
            localStorage.setItem('loggedin', true);
            localStorage.setItem('username', uName);
            localStorage.setItem('userId', uid);
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
            // setPersistence(auth, browserLocalPersistence)
            signInWithEmailAndPassword(auth, email, password)
            .then(signIn)
            .then(props.isLoggedIn)
            .catch(handleError);
        }
        else {
            setErrorMessage("Type password")
        }
    }

    // firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       // User is signed in, see docs for a list of available properties
    //       // https://firebase.google.com/docs/reference/js/firebase.User
    //       var uid = user.uid;
    //       // ...
    //     } else {
    //       // User is signed out
    //       // ...
    //     }
    //   });

    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       // User is signed in, see docs for a list of available properties
    //       // https://firebase.google.com/docs/reference/js/firebase.User
    //       const uid = user.uid;
    //       // ...
    //     } else {
    //       // User is signed out
    //       // ...
    //     }
    //   });

    return(
        <div>
            <LoginView 
                login =  {loginCB}
                email =  {email}
                updateEmail = {updateEmailCB}
                password =  {password}
                updatePassword = {updatePasswordCB}
                errorMessage = {errorMessage}
            />
            {/* <button onClick={test}>TEST</button> */}
        </div>
    );
}

export default LoginPresenter;
