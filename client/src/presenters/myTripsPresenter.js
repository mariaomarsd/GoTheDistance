import React, { useEffect, useState } from "react";
// import {GoogleMap,useLoadScript,Polyline} from "@react-google-maps/api";
// import usePlacesAutocomplete from "use-places-autocomplete";

const MyTripsView = require("../views/myTripsView.js").default;

function MyTripsPresenter(props) {

    useEffect(observerCB, []);
    const [tripList, setTripList] = useState(props.model.myTripsList);

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
    
    return(
        <div className="new-trip-presenter">
            <MyTripsView
                myTripsList={tripList}
            />
        </div>
    );
}

export default MyTripsPresenter;
