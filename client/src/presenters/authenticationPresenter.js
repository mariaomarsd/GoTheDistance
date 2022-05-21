import React, { useState } from "react";
import { motion } from "framer-motion";

const LoginPresenter = require("./loginPresenter").default;
const SignUpPresenter = require("./signUpPresenter").default;

function AuthenticationPresenter(props){
    const[loginToggle, setLoginToggle] =  useState(true);
    
    function toggleFunction(){
        setLoginToggle(!loginToggle);
    }

    return(
        <motion.div 
            className="auth-container"
            animate={{
                scale: [1, 1, 1, 1, 1],
                rotate: [180, 130, 80, 30, 0],
                borderRadius: ["10%", "10%", "10%", "10%", "10%"],
            }}>
            {props.visible && <>
                {loginToggle && 
                    <LoginPresenter 
                        isLoggedIn = {props.isLoggedIn}
                        toggle = {toggleFunction}
                    />
                }
                {!loginToggle && 
                    <SignUpPresenter 
                        isLoggedIn = {props.isLoggedIn}
                        setFirstSignin={props.setFirstSignin}
                        toggle = {toggleFunction}
                    />
                }
            </>}
        </motion.div>
    );
}

export default AuthenticationPresenter;