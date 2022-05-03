import React, { useState } from "react";

const LoginPresenter = require("./loginPresenter").default;
const SignUpPresenter = require("./signUpPresenter").default;

function AuthenticationPresenter(props){
    const[loginToggle, setLoginToggle] =  useState(true);
    
    function toggleFuntion(){
        setLoginToggle(!loginToggle);
    }
    return(
        <div>
            {props.visible && 
            <div>
                <div>
                    {loginToggle && <LoginPresenter isLoggedIn = {props.isLoggedIn}/>}
                </div>
                <div>
                    {!loginToggle && <SignUpPresenter isLoggedIn = {props.isLoggedIn}/>}
                </div>
                <button onClick={toggleFuntion}>
                    {loginToggle ? "create a new account" : "Go to sign in"}
                </button>
            </div>
            }
        </div>
    );
}

export default AuthenticationPresenter;