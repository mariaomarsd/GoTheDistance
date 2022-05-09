import React, { useState, useEffect } from "react";
import Confirm from "../components/confirm.js";
import { motion } from "framer-motion"

const NewTripPresenter = require("../presenters/newTripPresenter.js").default;
const MyTripsPresenter = require("../presenters/myTripsPresenter.js").default;
const StatisticsPresenter = require("../presenters/statisticsPresenter.js").default;
const ProfilePresenter = require("../presenters/profilePresenter.js").default;
const SignUpPresenter = require("../presenters/signUpPresenter.js").default;
const LoginPresenter = require("../presenters/loginPresenter.js").default;


function SidebarView(props) {

    const [visibleList, setVisibleList] = useState([false, false, false, false])

    const [confirmationVisible, setConfirmationVisible] = useState(false)

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
        <motion.div className="sidebar-view"
            animate={{ x: -50 }}
            transition={{ ease: "easeOut", duration: 2 }}
        >
        {props.visible  &&
            <div>
            <div className="sidebar-item" >
                {props.value && <NewTripPresenter
                    model = {props.model}
                    visible={visibleList}
                    setVisible={setVisibleCB}
                    confirmation={setConfirmationCB}
                />}
            </div>
            <div className="sidebar-item">
                <MyTripsPresenter
                    model={props.model}
                    // visible={false}
                    visible={visibleList}
                    setVisible={setVisibleCB}
                />
            </div>
            <div className="sidebar-item">
                <StatisticsPresenter 
                    model={props.model}
                    // visible={false}
                    visible={visibleList}
                    setVisible={setVisibleCB}
                />
            </div>
            <div className="sidebar-item">
                <ProfilePresenter 
                    model={props.model}
                    // visible={false}
                    visible={visibleList}
                    setVisible={setVisibleCB}
                    isLoggedIn={props.isLoggedIn}
                />
            </div>
            {confirmationVisible && <Confirm />}
            </div>
        }
        </motion.div>
    );
}

export default SidebarView;