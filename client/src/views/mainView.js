import React from "react";

import {useLoadScript} from "@react-google-maps/api";

const MapPresenter = require("../presenters/mapPresenter.js").default;
const SidebarView = require("../views/sidebarView.js").default;

const libraries = ["places"];

function MainView(props){

    const{ isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    
    return(
        <div className="main-view">
            <div className="map-container">
                <MapPresenter value={isLoaded}/>
            </div>
            <div className="sidebar-container">
                <SidebarView
                    model = {props.model} 
                    value = {isLoaded}
                    // newTripsLocationList={props.model.newTripsLocationList} 
                    // myTripsList={props.model.myTripsList} 
                    // addToNewTrip={props.model.addToNewTrip}
                    // removeFromNewTrip={props.model.removeFromNewTrip}
                    // saveTrip={props.model.saveTrip}
                    // setVisableTrips={props.model.setVisableTrips} 
                />
            </div>
        </div>
    );
}
export default MainView;