import React from "react";

function ProfileView(props) {
    function signoutCB(){
        props.signout();
    }
    function loginCB(){
        props.login();
    }
    return(
        <div className="profile-view">
            <div> 
                {props.loggedInUser != null && 
                    <div>
                        <p>Signed in as {props.loggedInUser} </p>
                        <button onClick={signoutCB}>Sign out</button>
                    </div>
                }
            </div>
            <div>
                {props.loggedInUser == null && 
                 <button onClick={loginCB}>Log in</button>}
            </div>
        </div>
    );
}

export default ProfileView;