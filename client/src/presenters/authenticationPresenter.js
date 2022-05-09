import React, { useState } from "react";
import { motion } from "framer-motion"

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
                <hr className="divide-solid"/>
                <button className="auth-button" onClick={toggleFuntion}>
                    {loginToggle ? <div> Need an acount? <u>SIGN UP</u> </div> : <div> Already a user? <u>LOGIN</u> </div>}
                </button>
               
            </div>
            }
        </div>
    );
}

export default AuthenticationPresenter;