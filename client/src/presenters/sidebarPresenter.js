import React, { useState, useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../components/useDimensions.js";
import { MenuToggle } from "../components/menuToggle.js";
import Confirm from "../components/confirm.js";

const NewTripPresenter = require("./newTripPresenter.js").default;
const MyTripsPresenter = require("./myTripsPresenter.js").default;
const StatisticsPresenter = require("./statisticsPresenter.js").default;

const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { y: { stiffness: 1000, velocity: -100 } }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: { y: { stiffness: 1000 } }
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

function SidebarPresenter(props) {

    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [isOpen, toggleOpen] = useCycle(true, false);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);

    function setVisibleCB(id) {
        props.model.toggleSidebar(id);
    }

    function setConfirmationCB() {
        setConfirmationVisible(true)
        setTimeout(function() {setConfirmationVisible(false) }, 2500)
    }

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
            <motion.div className="sidebar-background" style={{ height: 600 }} variants={sidebar} />
            <div className="sidebar-item-list">
                {props.value && <>
                    <NewTripPresenter
                        model={props.model}
                        setVisible={setVisibleCB}
                        confirmation={setConfirmationCB}
                        variants={variants}
                    />
                    <MyTripsPresenter
                        model={props.model}
                        setVisible={setVisibleCB}
                        variants={variants}
                        deleteConfirm={setConfirmCD}
                    />
                </>}
                <StatisticsPresenter 
                    model={props.model}
                    setVisible={setVisibleCB}
                    variants={variants}
                />
                {confirmationVisible && <Confirm text="Trip Saved!" />}
                {confirmDeleteVisible && <Confirm text="Trip Deleted!" />}
            </div>
            <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>}
        </>
    );
}

export default SidebarPresenter;