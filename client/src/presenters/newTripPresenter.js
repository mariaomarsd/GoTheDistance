import React, { useEffect, useState } from "react";
// import {GoogleMap,useLoadScript,Polyline} from "@react-google-maps/api";
// import usePlacesAutocomplete from "use-places-autocomplete";

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
        // console.log('NTP savetrip', item)
        props.model.saveTrip(item);
    }

    function setVisibleCB() {
        props.setVisible(0)
        setIsVisible(props.visible[0]);
    }

    return(
        <div className="new-trip-presenter">
            <div className="new-trip-title" onClick={setVisibleCB}>
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
        </div>
    );
}

export default NewTripPresenter;
