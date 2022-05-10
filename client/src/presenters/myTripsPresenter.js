import React, { useEffect, useState } from "react";
// import {GoogleMap,useLoadScript,Polyline} from "@react-google-maps/api";
// import usePlacesAutocomplete from "use-places-autocomplete";
import { motion } from "framer-motion";

const MyTripsView = require("../views/myTripsView.js").default;

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
        <motion.div className="my-trips-presenter" 
            // variants={props.variants}
            // whileHover={{ scale: 1.1 }}
            // whileTap={{ scale: 0.95 }}
        >
            <motion.div className="sidebar-titles" 
                variants={props.variants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={setVisibleCB}
            >
                MY TRIPS
            </motion.div>
            <div>
                {isVisible && <MyTripsView
                    myTripsList={tripList}
                    setVisibleTrips={setVisibleTripsCB}
                />}
            </div>
        </motion.div>
    );
}

export default MyTripsPresenter;
