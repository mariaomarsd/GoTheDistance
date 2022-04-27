import React from "react";

const MapPresenter = require("../presenters/mapPresenter.js").default;
const SidebarView = require("../views/sidebarView.js").default;

function MainView(props){
    
    return(
        <div className="main-view">
            <div className="map-container">
                    <MapPresenter/>
            </div>
            <div className="sidebar-container">
                <SidebarView
                    model = {props.model} 
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