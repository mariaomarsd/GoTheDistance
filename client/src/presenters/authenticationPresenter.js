import React, { useState } from "react";
// import { motion } from "framer-motion"

const LoginPresenter = require("./loginPresenter").default;
const SignUpPresenter = require("./signUpPresenter").default;

function AuthenticationPresenter(props){
    const[loginToggle, setLoginToggle] =  useState(true);
    
    function toggleFunction(){
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
                    {!loginToggle && <SignUpPresenter 
                                    isLoggedIn = {props.isLoggedIn}
                                    setFirstSignin={props.setFirstSignin}
                        />}
                </div>
                <hr className="divide-solid"/>
                <button className="auth-button" onClick={toggleFunction}>
                    {loginToggle ? <div> Need an account? <u>SIGN UP</u> </div> : <div> Already a user? <u>LOGIN</u> </div>}
                </button>
            </div>
            }
        </div>
    );
}

export default AuthenticationPresenter;