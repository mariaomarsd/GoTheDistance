import React, { useEffect, useState } from "react";
// import {GoogleMap,useLoadScript,Polyline} from "@react-google-maps/api";
// import usePlacesAutocomplete from "use-places-autocomplete";

const MyTripsView = require("../views/myTripsView.js").default;

function MyTripsPresenter(props) {

    useEffect(observerCB, []);
    const [tripList, setTripList] = useState(props.model.myTripsList);
    const [isVisible, setIsVisible] = useState();


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

    function setVisibleCB() {
        props.setVisible(1)
        setIsVisible(props.visible[1]);
    }
    
    return(
        <div className="my-trips-presenter">
            <div className="sidebar-titles" onClick={setVisibleCB}>
                MY TRIPS
            </div>
            <div>
                {isVisible && <MyTripsView
                    myTripsList={tripList}
                />}
            </div>
        </div>
    );
}

export default MyTripsPresenter;
