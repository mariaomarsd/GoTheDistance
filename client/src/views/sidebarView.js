import React, { useState, useEffect, useRef } from "react";
import Confirm from "../components/confirm.js";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../components/useDimensions.js";
import { MenuToggle } from "../components/menuToggle.js";
import ListWarning from "../components/listTooShort";

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

    const [visibleList, setVisibleList] = useState(props.model.sidebartoggle);
    const [newTripVis, setNewTripVis] = useState(false);
    const [myTripsVis, setMyTripVis] = useState(false);
    const [StatisticsVis, setStatisticsVis] = useState(false);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);

    // toggleSidebar(toOpen){
    //     this.sidebartoggle[toOpen] = !this.sidebartoggle[toOpen];
    //     this.notifyObservers();
    // }

    function setVisibleCB(id) {
        // for(var i = 0; visibleList.length; i++) {
        //     // if(id === i) {
        //     //     visibleList[i] = !visibleList[i];
        //     //     console.log("toggle");
        //     //     console.log(visibleList[i]);
        //     // }
        //     // else {
        //     //     visibleList[i] = false;
        //     // }
        // }
        // visibleList[id] = !visibleList[id];
        // setVisibleList(visibleList);
        //var ble =  visibleList;
        // for(var i = 0; i<visibleList.length; i++) {
        //     visibleList[i] = !visibleList[i];
        // }
        // ble[1] = !ble[1];
        // setVisibleList(ble);
        // console.log(visibleList);
        // console.log(visibleList[0]);
        // console.log(visibleList[1]);
        // console.log("pressed", id);
        // setNewTripVis(ble[1]);
        // console.log("MYTRIPSVIS", myTripsVis);
        // setMyTripVis(true);
        // setStatisticsVis(true);
        props.model.toggleSidebar(id);
        console.log(props.model.sidebartoggle);
    }

    // function changeVisibility(id, bool){
    //     var temp = visibleList;
    //     visibleList
    //     setVisibleList()
    // }

    function setConfirmationCB() {
        setConfirmationVisible(true)
        setTimeout(function() {setConfirmationVisible(false) }, 2500)
    }
    // function setlistwarningCD(){
    //     setListWarningVisible(true)
    //     setTimeout(function() {setListWarningVisible(false) }, 2500)
    // }

    function setConfirmCD(){
        setConfirmDeleteVisible(true)
        setTimeout(function() {setConfirmDeleteVisible(false) }, 2500)
    }

    return(
        <>
        {props.visible  && <motion.nav 
                className="sidebar-view"
                initial={false}
                animate={isOpen ? "open" : "closed"}
                custom={height}
                ref={containerRef}
            >
            <motion.div
                className="sidebar-background"
                style={{ height: height }}
                variants={sidebar}
            />
            <div className="sidebar-item-list">
                <div className="sidebar-item" >
                    {props.value && <NewTripPresenter
                        model = {props.model}
                        visible={visibleList}
                        setVisible={setVisibleCB}
                        confirmation={setConfirmationCB}
                        variants={variants}
                        //listWarning={setlistwarningCD}
                        isVisible={visibleList[0]}
                    />}
                </div>
                <div className="sidebar-item">
                    <MyTripsPresenter
                        model={props.model}
                        // visible={false}
                        visible={visibleList}
                        setVisible={setVisibleCB}
                        variants={variants}
                        isVisible={myTripsVis}
                        deleteConfirm={setConfirmCD}
                    />
                </div>
                <div className="sidebar-item">
                    <StatisticsPresenter 
                        model={props.model}
                        // visible={false}
                        visible={visibleList}
                        setVisible={setVisibleCB}
                        variants={variants}
                        isVisible={visibleList[2]}
                    />
                </div>
                {confirmationVisible && <Confirm text="Trip Saved!" />}
                {confirmDeleteVisible && <Confirm text="Trip Deleted!" />}
            </div>
            <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>}
        </>
    );
}

export default SidebarView;