import React, { useEffect, useState } from "react";
// import {GoogleMap,useLoadScript,Polyline} from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";

const NewTripView = require("../views/newTripView.js").default;

function NewTripPresenter(props) {
    const [locationList, setLocationList] = useState(props.model.newTripsLocationList);

    const {
        ready, // is it set up and redy to go with libraries, see above  in app function
        value, // what is the current value that user is writing
        suggestions: { status, data }, // what is the data from these suggestions
        setValue 
    } = usePlacesAutocomplete();
    
    // function testFunction(){
    //     console.log("status", status, "data", data);
    // }

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
    }

    return(
        <div className="new-trip-presenter">
            <NewTripView
                locationList={locationList} 
                addToTrip={addToNewTripACB}
                removeFromTrip={removeFromNewTripACB}
                confirmTrip={saveTripACB}
            />
        </div>
    );
}

export default NewTripPresenter;
