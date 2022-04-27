import React, { useEffect, useState, useRef, useCallback } from "react";
import {GoogleMap,useLoadScript,Polyline} from "@react-google-maps/api";
import mapStyles from "../mapStyles";

const libraries = ["places"];

const center = { // where to start the map, stockholm
    lat: 23.818858,
    lng: 6.094477,
};
  
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    minZoom: 3,
};
  
const mapContainerStyle = {
    height: "100vh",
};

function MapPresenter(props){
    
    const{ isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const mapRef = useRef(); // part of move mapview to chosen destination

    const onMapLoad = useCallback((map) => { // part of move mapview to chosen destination
        mapRef.current = map; // part of move mapview to chosen destination
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    
    return(
          <div>
              <GoogleMap id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={3}
                center={center}
                options={options}
                onLoad={onMapLoad}>
                </GoogleMap>
          </div>
      );
}

export default MapPresenter;