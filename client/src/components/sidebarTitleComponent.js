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
            <i className={props.icon} id="sidebar-icon" style={{ color: props.color }}></i>
            <div className="sidebar-name" style={{color: props.color, borderColor: props.color}}>
                {props.title}
            </div>
        </motion.div>
    );
}

export default SidebarTitleComponent;
