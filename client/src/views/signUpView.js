import React from "react";

function SignUpView(props) {
    
    function updateUsernameCB(event) {
        props.updateUsername(event.target.value);
    }

    function updateEmailCB(event) {
        props.updateEmail(event.target.value);
    }

    function updatePasswordCB(event) {
        props.updatePassword(event.target.value);
    }

    function updateConfirmPasswordCB(event) {
        props.updateConfirmPassword(event.target.value);
    }

    function createUserCB(event){
        console.log("clicked submit button");
        props.createUser();
    }
    
    return(
        <div className="sign-up-view">
            <form className = "sign-up-form">
                <div className="sign-up-heading">
                    SIGN UP
                </div>
                <div className="sign-up-username">
                    <div className="sign-up-title">
                        Username
                    </div>
                    <input
                        className="sign-up-input"      
                        type="text"   
                        onChange={updateUsernameCB}
                        value={props.username}
                        // placeholder="Enter your username"
                    />
                </div>
                <div className="sign-up-email">
                    <div className="signup-title">
                        Email
                    </div>
                    <input
                        className="sign-up-input" 
                        type="email"
                        onChange={updateEmailCB}
                        value = {props.email}
                        // placeholder="Enter your email address"
                    />
                </div>
                <div className="sign-up-password">
                    <div className="sign-up-title">
                        Password
                    </div>
                    <input
                        className="sign-up-input" 
                        type="password"
                        onChange={updatePasswordCB}
                        value={props.password}
                        // placeholder="Enter your password"
                    />
                </div>
                <div className="sign-up-password">
                    <div className="signup-title">
                        Repeat your password
                    </div>
                    <input
                        className="sign-up-input" 
                        type="password"
                        onChange={updateConfirmPasswordCB}
                        value={props.confirmPassword}
                        // placeholder="Repeat your password"
                    />
                </div>    
                <p className="sign-up-error-message">
                    {props.displayErrorMessage}
                </p>
            </form>
            <button className="sign-up-button" type="submit" onClick={createUserCB}>
                SIGN UP
            </button>
        </div>
    );
}

export default SignUpView;