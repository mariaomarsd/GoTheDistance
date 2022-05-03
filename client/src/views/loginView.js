import React from "react";

function LoginView(props) {
    function updateEmailCB(event){
        props.updateEmail(event.target.value);
    }
    function updatePasswordCB(event){
        props.updatePassword(event.target.value);
    }
    function loginCB() {
        props.login();
    }
    
    return(
        <div className="login-view">
            <form className="login-form">
                <input
                    type="email"
                    value={props.email}
                    placeholder="Enter your email address"
                    onChange={updateEmailCB}
                />
                <input
                    type="password"
                    value={props.password}
                    placeholder="Enter your password"
                    onChange={updatePasswordCB}
                />
                <p>{props.errorMessage}</p>
            </form>
            <button onClick={loginCB}>Login</button>
        </div>
    );
}

export default LoginView;