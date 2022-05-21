import React from "react";
import { motion } from "framer-motion";

function ProfileView(props) {
    function signoutCB(){
        props.signout();
    }

    return(
        <div className="user-container">
            {props.loggedInUser && 
                <div className="user-view">
                    <span className="user">Welcome {props.user}!</span>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} > 
                        <button className="user-button" id="user"onClick={signoutCB}>
                            Sign out
                            <span> <i className="fa-solid fa-person-walking-luggage"></i> </span>
                        </button>
                    </motion.div>
                </div>
            }
        </div>
    );
}

export default ProfileView;