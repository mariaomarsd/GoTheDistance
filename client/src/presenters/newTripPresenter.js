import React, { useEffect, useState } from "react";

const NewTripView = require("../views/newTripView.js").default;

function NewTripPresenter(props) {

    const [locationList, setLocationList] = useState(props.model.newTripsLocationList);
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
        console.log("location list (setlocationlistcb)", props.model.newTripsLocationList);
        console.log("location list", locationList);
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
