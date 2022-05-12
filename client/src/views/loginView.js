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
    function onKeyUpCB(event){
        if(event.key === 'Enter') {
            props.login();
        }
    }
    
    return(
        <div className="login-view">
            <form className="login-form">
                <div className="login-heading" >
                    LOGIN
                </div>
                <div className="login-email">
                    <div className="login-title">
                        Email
                    </div>
                    <input
                        className="login-input"
                        type="email"
                        value={props.email}
                        onChange={updateEmailCB}
                        onKeyUp={onKeyUpCB}
                    />
                </div>
                <div className="login-password">
                    <div className="login-title">
                        Password
                    </div>
                    <input
                        className="login-input"
                        type="password"
                        value={props.password}
                        onChange={updatePasswordCB}
                        onKeyUp={onKeyUpCB}
                    />
                    <p>{props.errorMessage}</p>
                </div>
            </form>
            <button className="login-button" onClick={loginCB}>LOGIN</button>
        </div>
    );
}

export default LoginView;