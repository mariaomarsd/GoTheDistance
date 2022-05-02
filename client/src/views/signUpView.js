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
                <input          
                    type="text"   
                    onChange={updateUsernameCB}
                    value={props.username}
                    placeholder="Enter your username"
                />
                <input
                    type="email"
                    onChange={updateEmailCB}
                    value = {props.email}
                    placeholder="Enter your email address"
                />
                <input
                    type="password"
                    onChange={updatePasswordCB}
                    value={props.password}
                    placeholder="Enter your password"
                />
                <input
                    type="password"
                    onChange={updateConfirmPasswordCB}
                    value={props.confirmPassword}
                    placeholder="Repeat your password"
                />
                <p className="signup-error-message">
                    {props.displayErrorMessage}
                </p>
            </form>
            <button type="submit" onClick={createUserCB}>
                    Submit
            </button>
        </div>
    );
}

export default SignUpView;