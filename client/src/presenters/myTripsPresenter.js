import React, { useEffect, useState } from "react";
// import {GoogleMap,useLoadScript,Polyline} from "@react-google-maps/api";
// import usePlacesAutocomplete from "use-places-autocomplete";
import { motion } from "framer-motion";

const MyTripsView = require("../views/myTripsView.js").default;
const EditTripView = require("../views/editTripView.js").default;


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
    const [locationList, setLocationList] = useState();
    const [editTrip, setEditTrip] = useState(false);
    const [tripToChange, setTripToChange] = useState();
 

    function observerCB(){
        props.model.addObserver(setTripListCB);
        function componentDiesCB() {
            props.model.removeObserver(setTripListCB);
        }
        return componentDiesCB;
    }

    function setTripListCB() {
        setTripList(props.model.myTripsList);
        setLocationList(props.model.newTripsLocationList);
    }

    function setVisibleCB() {
        props.setVisible(1)
        setIsVisible(props.visible[1]);
    }

    function setVisibleTripsCB(id) {
        props.model.setVisableTrips(id);
    }

    function openEditCB(open) {
        props.openEdit(open);
    }

    function addToTripACB(item) {
        props.model.addToNewTrip(item);
        console.log("in model", props.model.newTripsLocationList);
        console.log("in presenter", locationList);
    }

    function removeFromTripACB(id) {
        props.model.removeFromNewTrip(id)
    }

    function saveTripACB(item) {
        props.model.updateLocationList(tripToChange);
        setEditTrip(false);
    }

    function updateOrderACB() {

    }

    function cancelCB(){
        props.model.emptyLocationList();
        setEditTrip(false);
    }

    function setTripToEditACB(trip) {
        console.log(trip);
        console.log(trip.locations);
        setTripToChange(trip);
        props.model.editTrip(trip);
        setEditTrip(true);
        console.log("location  list in model", props.model.newTripsLocationList);
        console.log("location list in mytripsview", locationList);
    }
    
    return(
        <motion.div className="my-trips-presenter" variants={props.variants} >
            <motion.div 
                className="sidebar-titles" 
                onClick={setVisibleCB}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }} 
            >
                <i className="fa-solid fa-map-location-dot" id="sidebar-icon" style={{ color:"rgb(227, 177, 151)" }}></i>
               <div className="sidebar-name" style={{ borderColor:"rgb(227, 177, 151)" }}>
                    MY TRIPS
                </div>
            </motion.div>
            {isVisible && <MyTripsView
                myTripsList={tripList}
                setVisibleTrips={setVisibleTripsCB}
                setTripToChange={setTripToChange}
                editTrip={setTripToEditACB}
                model={props.model}
            />}
            {editTrip && 
                <EditTripView 
                locationList={locationList}
                addToTrip={addToTripACB}
                removeFromTrip={removeFromTripACB}
                confirmTrip={saveTripACB}
                updateOrder={updateOrderACB}
                cancel = {cancelCB}
                // editTrip  = {setTripToEditACB}
                />
            }
        </motion.div>
    );
}

export default MyTripsPresenter;
