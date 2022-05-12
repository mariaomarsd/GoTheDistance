import React, { useEffect, useState } from "react";
// import {GoogleMap,useLoadScript,Polyline} from "@react-google-maps/api";
// import usePlacesAutocomplete from "use-places-autocomplete";
import { motion } from "framer-motion";
import * as geometry from 'spherical-geometry-js';

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

    useEffect(observerCB, [props.model.myTripsList]);
    // useEffect(visibleCB, [props.model.sidebartoggle]);
    const [tripList, setTripList] = useState(props.model.myTripsList);
    const [tripListVisible, setTripListVisible] = useState();
    const [isVisible, setIsVisible] = useState(props.model.sidebartoggle[1]);
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

    // function visibleCB(){
    //     props.model.addObserver(updateVisibilityCB);
    // }

    function setTripListCB() {
        setTripList(props.model.myTripsList);
        setLocationList(props.model.newList);
        setIsVisible(props.model.sidebartoggle[1]);
    }

    // function updateVisibilityCB(){
    //     setIsVisible(props.model.myTripsList);
    // }

    function setVisibleCB() {
        props.setVisible(1)
        //setIsVisible(props.isVisible);
        setTripListVisible(true);
        setEditTrip(false);
        props.model.emptyNewList();
    }

    function setVisibleTripsCB(id) {
        props.model.setVisableTrips(id);
    }

    function openEditCB(open) {
        props.openEdit(open);
    }

    function addToTripACB(item) {
        //props.model.addToNewTrip(item);
        props.model.addToNewList(item);
        console.log("in model", props.model.newTripsLocationList);
        console.log("in presenter", locationList);
    }

    function removeFromTripACB(id) {
        props.model.removeFromEditList(id);
    }

    function calculateDistanceCB() {
        var distanceLength = 0;
        var tempDistanceList = JSON.parse(JSON.stringify(props.model.newList));
        tempDistanceList.forEach(item => {
            delete item['name'];
        });
        
        for (let i = 0; i < tempDistanceList.length - 1; i++) {
            distanceLength  += geometry.computeDistanceBetween(tempDistanceList[i], tempDistanceList[i + 1]);
        }
        return distanceLength/1000 /*+ "KM"*/;
    }

    function saveTripACB(item) {
        console.log(item);
        var dist = calculateDistanceCB();
        props.model.updateLocationList(tripToChange, dist);
        setEditTrip(false);
        setTripListVisible(true);
    }

    function updateOrderACB() {

    }

    function cancelCB(){
        //props.model.emptyLocationList();
        setEditTrip(false);
        setTripListVisible(true);
    }

    function setTripToEditACB(trip) {
        console.log(trip);
        console.log(trip.locations);
        setTripToChange(trip);
        props.model.editTrip(trip);
        setEditTrip(true);
        setTripListVisible(false);
        console.log("location  list in model", props.model.newTripsLocationList);
        console.log("location list in mytripsview", locationList);
    }

    function test() {
        props.deleteConfirm()
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
            {isVisible && tripListVisible && <MyTripsView
                myTripsList={tripList}
                setVisibleTrips={setVisibleTripsCB}
                setTripToChange={setTripToChange}
                editTrip={setTripToEditACB}
                model={props.model}
                confirmDelete={test}
            />}
            {isVisible && editTrip && 
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
