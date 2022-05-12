import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as geometry from 'spherical-geometry-js';
import ListWarning from "../components/listTooShort";

const MyTripsView = require("../views/myTripsView.js").default;
const EditTripView = require("../views/editTripView.js").default;

function MyTripsPresenter(props) {

    useEffect(observerCB, [props.model.myTripsList]);
    const [tripList, setTripList] = useState(props.model.myTripsList);
    const [tripListVisible, setTripListVisible] = useState();
    const [isVisible, setIsVisible] = useState(props.model.sidebartoggle[1]);
    const [locationList, setLocationList] = useState();
    const [editTrip, setEditTrip] = useState(false);
    const [tripToChange, setTripToChange] = useState();
    const [listwarningVisible, setListWarningVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    function observerCB(){
        props.model.addObserver(setTripListCB);
        function componentDiesCB() {
            props.model.removeObserver(setTripListCB);
        }
        return componentDiesCB;
    }

    function setTripListCB() {
        setTripList(props.model.myTripsList);
        setLocationList(props.model.newList);
        setIsVisible(props.model.sidebartoggle[1]);
    }

    function setVisibleCB() {
        props.setVisible(1)
        setTripListVisible(true);
        setEditTrip(false);
        props.model.emptyNewList();
    }

    function setVisibleTripsCB(id) {
        props.model.setVisableTrips(id);
    }

    function addToTripACB(item) {
        props.model.addToNewList(item);
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
        if(props.model.newList.length < 2) {
            setErrorMessage("Trip needs to have at least two stops!");
            setlistwarningCB();
            
        }
        else {
            var dist = calculateDistanceCB();
            props.model.updateLocationList(tripToChange, dist);
            setEditTrip(false);
            setTripListVisible(true);
        }
    }

    function updateOrderACB(item) {
        props.model.newOrderEditList(item);
    }

    function cancelCB(){
        setEditTrip(false);
        setTripListVisible(true);
    }

    function setTripToEditACB(trip) {
        setTripToChange(trip);
        props.model.editTrip(trip);
        setEditTrip(true);
        setTripListVisible(false);
    }

    function test() {
        props.deleteConfirm()
    }

    function setlistwarningCB(){
        setListWarningVisible(true)
        setTimeout(function() {setListWarningVisible(false) }, 2500)
    }
 
    return(
        <motion.div className="my-trips-presenter" variants={props.variants} >
            <motion.div 
                className="sidebar-titles" 
                onClick={setVisibleCB}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }} 
            >
                <i className="fa-solid fa-map-location-dot" id="sidebar-icon" style={{ color:"rgb(213 121 81)" }}></i>
                <div className="sidebar-name" style={{color:"rgb(213 121 81)", borderColor:"rgb(213 121 81)" }}>
                    My Trips
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
                />
            }
            {isVisible && listwarningVisible && <ListWarning warning = {errorMessage}/>}
        </motion.div>
    );
}

export default MyTripsPresenter;
