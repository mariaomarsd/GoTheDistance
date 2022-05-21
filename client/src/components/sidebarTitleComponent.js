import React from "react";
import { motion } from "framer-motion";

function SidebarTitleComponent(props){
    return(
        <motion.div 
                className="sidebar-titles" 
                onClick={props.setVisible}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }} 
            >
                <i className="fa-solid fa-map-location-dot" id="sidebar-icon" style={{ color:"rgb(213 121 81)" }}></i>
                <div className="sidebar-name" style={{color:"rgb(213 121 81)", borderColor:"rgb(213 121 81)" }}>
                    {props.sidebarTitle}
                </div>
        </motion.div>
    );
}

export default SidebarTitleComponent;