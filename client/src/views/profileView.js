import React from "react";
import { motion } from "framer-motion";

function ProfileView(props) {
    function signoutCB(){
        localStorage.setItem("loggedin", false)
        props.signout();
    }

    return(

        <div className="user-container">
            <div> 
                {localStorage.getItem('loggedin') == "true" && 
                    <div className="user-view">
                        <span className="user">Welcome {localStorage.getItem("username")}!</span>
                        <motion.div 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }} 
                        > 
                            <button className="user-button" id="user"onClick={signoutCB}>
                                Sign out
                            <span> <i className="fa-solid fa-person-walking-luggage"></i> </span>
                            </button>
                        </motion.div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ProfileView;