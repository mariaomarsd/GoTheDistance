import React from "react";

function ProfileView(props) {
    function signoutCB(){
        localStorage.setItem("loggedin", false)
        props.signout();
    }
    // function loginCB(){
    //     //props.login();
    // }
    return(

        <div className="user-container">
            <div> 
                {localStorage.getItem('loggedin') == "true" && 
                    <div className="user-view">
                        {/* <i className="fa-solid fa-user"></i> */}
                        <span className="user">Welcome {localStorage.getItem("username")}!</span>
                        <div> 
                            <button className="user-button" id="user"onClick={signoutCB}>
                                Sign out
                            <span> <i className="fa-solid fa-person-walking-luggage"></i> </span>
                        </button></div>
                    </div>
                }
            </div>

            {/* <div>
                {props.loggedInUser == null && 
                <button onClick={loginCB}>Log in</button>}
            </div> */}
        </div>
        
        // <div className="user-container">
        //     <div> 
        //         {props.loggedInUser != null && 
        //             <div>
        //                 <p>Signed in as {props.loggedInUser} </p>
        //                 <button onClick={signoutCB}>Sign out</button>
                        
        //             </div>
        //         }
        //     </div>
        //     <div>
        //         <div className="user-view" id="screen">
        //             <button className="user-button" id="user" onClick={loginCB}>
        //                 <i className="fa-solid fa-person-walking-luggage"></i>
        //             </button>
        //             <div>
        //             <i className="fa-solid fa-person-walking-luggage"></i>
        //              <span className="user">Signed in as {props.loggedInUser}</span>
        //              <span><button className="user-button" id="user"onClick={signoutCB}>Sign out</button></span>
        //             </div>
                    
                    
        //         </div>
        //         <div className="user-popout">
        //                 {props.loggedInUser == null && 
        //                 <button onClick={loginCB}>Log in</button>}
        //             </div>
        //     </div>
        // </div>
    );
}

export default ProfileView;