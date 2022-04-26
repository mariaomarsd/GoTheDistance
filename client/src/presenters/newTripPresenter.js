import React from "react";

const NewTripView = require("../views/newTripView.js").default;

function NewTripPresenter(props) {

    function addToNewTripACB(item) {
        props.addToNewTrip(item);
    }

    function removeFromNewTripACB(id) {
        props.removeFromNewTrip(id)
    }

    function saveTripACB(item) {
        props.saveTrip(item);
    }

    return(
        <div className="new-trip-presenter">
            <NewTripView
                locationList={props.newTripsLocationList} 
                addToTrip={addToNewTripACB}
                removeFromTrip={removeFromNewTripACB}
                confirmTrip={saveTripACB}
            />
        </div>
    );
}

export default NewTripPresenter;
