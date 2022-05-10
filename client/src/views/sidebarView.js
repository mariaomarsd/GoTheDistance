import React, { useState, useEffect, useRef } from "react";
import Confirm from "../components/confirm.js";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./usedeme.js";
import { MenuToggle } from "./menuToggle.js";


const NewTripPresenter = require("../presenters/newTripPresenter.js").default;
const MyTripsPresenter = require("../presenters/myTripsPresenter.js").default;
const StatisticsPresenter = require("../presenters/statisticsPresenter.js").default;
const ProfilePresenter = require("../presenters/profilePresenter.js").default;
const SignUpPresenter = require("../presenters/signUpPresenter.js").default;
const LoginPresenter = require("../presenters/loginPresenter.js").default;

const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };


//   const variants2 = {
//     open: {
//       transition: { staggerChildren: 0.07, delayChildren: 0.2 }
//     },
//     closed: {
//       transition: { staggerChildren: 0.05, staggerDirection: -1 }
//     }
//   };

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};
  

function SidebarView(props) {

    const [visibleList, setVisibleList] = useState([false, false, false, false]);

    const [confirmationVisible, setConfirmationVisible] = useState(false);
    
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);

    function setVisibleCB(id) {
        if(visibleList[0] === true) {
            props.setLoc(1)
        }
        else{
            props.setLoc(0)
        }
        visibleList[id] = !visibleList[id];
        setVisibleList(visibleList);
    }

    function setConfirmationCB() {
        setConfirmationVisible(true)
        setTimeout(function() {setConfirmationVisible(false) }, 2500)
    }

    return(
        <motion.nav className="sidebar-view"
            // animate={{ x: -50 }}
            // transition={{ ease: "easeOut", duration: 2 }}
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
        >
        <MenuToggle toggle={() => toggleOpen()} />
        {props.visible  &&
            <motion.div
                variants={sidebar}
            >
                <div className="sidebar-item" >
                    {props.value && <NewTripPresenter
                        model = {props.model}
                        visible={visibleList}
                        setVisible={setVisibleCB}
                        confirmation={setConfirmationCB}
                        variants={variants}
                    />}
                </div>
                <div className="sidebar-item">
                    <MyTripsPresenter
                        model={props.model}
                        // visible={false}
                        visible={visibleList}
                        setVisible={setVisibleCB}
                        variants={variants}
                    />
                </div>
                <div className="sidebar-item">
                    <StatisticsPresenter 
                        model={props.model}
                        // visible={false}
                        visible={visibleList}
                        setVisible={setVisibleCB}
                        variants={variants}
                    />
                </div>
                <div className="sidebar-item">
                    {/* <ProfilePresenter 
                        model={props.model}
                        // visible={false}
                        visible={visibleList}
                        setVisible={setVisibleCB}
                        isLoggedIn={props.isLoggedIn}
                    /> */}
                </div>
                
                {confirmationVisible && <Confirm />}
            </motion.div>
        }
        
        </motion.nav>
    );
}

export default SidebarView;