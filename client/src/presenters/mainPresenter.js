import React from "react";

const Map = require("../views/mapView.js").default;
const Sidebar = require("../views/sidebarView.js").default;

function MainPrestenter(){
    
    var locations = [];

    function addLocationCB(placeToAdd){
        locations.push(placeToAdd);
    }


    return(
        <div className="main-presenter">
            <div className="map-container">
                <Map locationList={locations} ></Map>
            </div>
            <div className="sidebar-container">
                <Sidebar setLocation={addLocationCB}></Sidebar>
        </div>
        </div>
    );
}

export default MainPrestenter;