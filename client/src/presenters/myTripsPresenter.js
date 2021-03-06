import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as geometry from 'spherical-geometry-js';
import WarningMessage from "../components/warningMessage.js";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

const MyTripsView = require("../views/myTripsView.js").default;
const EditTripView = require("../views/editTripView.js").default;
const SidebarTitleComponent = require("../components/sidebarTitleComponent.js").default;

function MyTripsPresenter(props) {

    const [tripList, setTripList] = useState(props.model.myTripsList);
    const [tripListVisible, setTripListVisible] = useState();
    const [isVisible, setIsVisible] = useState(props.model.sidebartoggle[1]);
    const [locationList, setLocationList] = useState();
    const [editTrip, setEditTrip] = useState(false);
    const [tripToChange, setTripToChange] = useState();
    const [warningMessageVisible, setWarningMessageVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const [tripsVisableList, setTripsVisibleList] = useState();

    const {
        ready, // is it set up and redy to go with libraries, see above  in app function
        suggestions: { status, data }, // what is the data from these suggestions
        setValue 
    } = usePlacesAutocomplete();

    useEffect(observerCB, [props.model.myTripsList]);

    function observerCB(){
        props.model.addObserver(setTripListCB);
        function componentDiesCB() {
            props.model.removeObserver(setTripListCB);
        }
        return componentDiesCB;
    }

    async function selectPlace(address) {
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            const temp_results = (results[0].formatted_address).split(',')
            const temp_place = temp_results[0] + ", " + temp_results.pop()
            return {id: Math.random(),name: temp_place, lat: lat, lng: lng};
        } catch (error) {
            console.log(" Error: ", error);
        }
    }

    function setTripListCB() {
        setTripList(props.model.myTripsList);
        setLocationList(props.model.newList);
        setIsVisible(props.model.sidebartoggle[1]);
        getVisibleList();
    }

    function getVisibleList() {
        var tempList = [];
        for(let i = 0; i<props.model.myTripsList.length; i++) {
            tempList.push(props.model.myTripsList[i].show)
        }
        setTripsVisibleList(tempList)
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
        return distanceLength/1000;
    }

    function saveTripACB() {
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

    function confirmDeleteCB(item) {
        props.model.deleteMyTrip(item);
        props.deleteConfirm();
    }

    function setlistwarningCB(){
        setWarningMessageVisible(true)
        setTimeout(function() {setWarningMessageVisible(false) }, 2500)
    }
 
    return(
        <motion.div className="sidebar-item" variants={props.variants} >
            <SidebarTitleComponent
                setVisible = {setVisibleCB}
                icon = {"fa-solid fa-map-location-dot"}
                color = {"rgb(213 121 81)"}
                title = {"My trips"}
            />
            {isVisible && tripListVisible && 
                <MyTripsView
                    myTripsList={tripList}
                    setVisibleTrips={setVisibleTripsCB}
                    setTripToChange={setTripToChange}
                    editTrip={setTripToEditACB}
                    confirmDelete={confirmDeleteCB}
                />
            }
            {isVisible && editTrip && 
                <EditTripView 
                    locationList={locationList}
                    addToTrip={addToTripACB}
                    removeFromTrip={removeFromTripACB}
                    confirmTrip={saveTripACB}
                    updateOrder={updateOrderACB}
                    cancel = {cancelCB}
                    selectPlace = {selectPlace}
                    data={data}
                    status={status}
                    setValue={setValue}
                    ready={ready}
                    setItems = {setLocationList}
                />
            }
            {isVisible && warningMessageVisible && <WarningMessage warning = {errorMessage}/>}
        </motion.div>
    );
}

export default MyTripsPresenter;
