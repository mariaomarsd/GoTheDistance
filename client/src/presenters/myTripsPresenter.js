import React, { useEffect, useState } from "react";
// import {GoogleMap,useLoadScript,Polyline} from "@react-google-maps/api";
// import usePlacesAutocomplete from "use-places-autocomplete";
import { motion } from "framer-motion";

const MyTripsView = require("../views/myTripsView.js").default;

const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

function MyTripsPresenter(props) {

    useEffect(observerCB, []);
    const [tripList, setTripList] = useState(props.model.myTripsList);
    const [isVisible, setIsVisible] = useState(); 

    function observerCB(){
        props.model.addObserver(setTripListCB);
        function componentDiesCB() {
            props.model.removeObserver(setTripListCB);
        }
        return componentDiesCB;
    }

    function setTripListCB() {
        setTripList(props.model.myTripsList);
    }

    function setVisibleCB() {
        props.setVisible(1)
        setIsVisible(props.visible[1]);
    }

    function setVisibleTripsCB(id) {
        props.model.setVisableTrips(id);
    }
    
    return(
        <motion.div className="my-trips-presenter" variants={props.variants} >
            <motion.div 
                className="sidebar-titles" 
                onClick={setVisibleCB}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }} 
            >
                <i className="fa-solid fa-map-location-dot"></i>
                MY TRIPS
            </motion.div>
            {isVisible && <MyTripsView
                myTripsList={tripList}
                setVisibleTrips={setVisibleTripsCB}
            />}
        </motion.div>
    );
}

export default MyTripsPresenter;
