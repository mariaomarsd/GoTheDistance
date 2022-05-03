import React, { useEffect, useState } from "react";
// import {GoogleMap,useLoadScript,Polyline} from "@react-google-maps/api";
// import usePlacesAutocomplete from "use-places-autocomplete";

import * as geometry from 'spherical-geometry-js';

const NewTripView = require("../views/newTripView.js").default;

function NewTripPresenter(props) {
    
    const [locationList, setLocationList] = useState(props.model.newTripsLocationList);
    const [isVisible, setIsVisible] = useState();

    // called when component is created or the list changes
    useEffect(observerCB, []);

    function observerCB(){
        props.model.addObserver(setLocationListCB);
        function componentDiesCB() {
            props.model.removeObserver(setLocationListCB);
        }
       
        // called when the component is taken down
        return componentDiesCB;
    }
    
    function setLocationListCB() {
        setLocationList(props.model.newTripsLocationList);
    }

    function addToNewTripACB(item) {
        props.model.addToNewTrip(item);

    }

    function removeFromNewTripACB(id) {
        props.model.removeFromNewTrip(id)
    }

    function saveTripACB(item) {
        props.model.saveTrip(item);
        props.setVisible(0)
        setIsVisible(props.visible[0]);
        props.confirmation()
    }

    function setVisibleCB() {
        props.setVisible(0);
        setIsVisible(props.visible[0]);
    }

    function test() {
            const latlng1 = new geometry.LatLng(72, 6);
            const latlng2 = new geometry.LatLng(16, 150);
            var test = geometry.computeDistanceBetween(latlng1, latlng2);
            console.log("HALLO HÆ", test/1000)
    }

    return(
        <div className="new-trip-presenter">
            <div className="sidebar-titles" onClick={setVisibleCB}>
                NEW TRIP
            </div>
            <div>   
                {isVisible && <NewTripView
                    locationList={locationList} 
                    addToTrip={addToNewTripACB}
                    removeFromTrip={removeFromNewTripACB}
                    confirmTrip={saveTripACB}
                />}
            </div>
            <button onClick={test}>HALLO HÆ BLESSUP</button>
        </div>
    );
}

export default NewTripPresenter;
