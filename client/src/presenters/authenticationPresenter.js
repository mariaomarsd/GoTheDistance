import React, { useState } from "react";
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
                        {loginToggle && 
                            <LoginPresenter 
                                isLoggedIn = {props.isLoggedIn}
                                toggle = {toggleFunction}
                            />
                        }
                    </div>
                    <div>
                        {!loginToggle && 
                            <SignUpPresenter 
                                isLoggedIn = {props.isLoggedIn}
                                setFirstSignin={props.setFirstSignin}
                                toggle = {toggleFunction}
                            />
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default AuthenticationPresenter;