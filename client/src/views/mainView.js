import React from "react";
import {useLoadScript} from "@react-google-maps/api";
import * as geometry from 'spherical-geometry-js';

const MapPresenter = require("../presenters/mapPresenter.js").default;
const SidebarView = require("../views/sidebarView.js").default;

const libraries = ["places", "geometry"];

function MainView(props){

    const{ isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    function test() {
        var path = {lat: 30, lng:40} 
        // const encodeString = google.maps.spherical.computeDistanceBetween(path);
        console.log("HALLO HÆ", geometry.computeDistanceBetween(path))
    }
    
    return(
        <div className="main-view">
            <div className="map-container">
                <MapPresenter value={isLoaded}
                model={props.model} />
            </div>
            <div className="sidebar-container">
                <SidebarView
                    model = {props.model} 
                    value = {isLoaded}
                />
            </div>
            <button onClick={test}>
                HALLO HÆ
            </button>
            <div>
                Hér er ég
            </div>
        </div>
    );
}
export default MainView;