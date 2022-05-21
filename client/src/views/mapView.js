import React from "react";
import { GoogleMap, Polyline, Marker } from "@react-google-maps/api";
import mapStyles from "../mapStyles";
import mapStylesBlack from "../mapStylesBlack";
import { motion } from "framer-motion";

const center = {
    lat: 23.818858,
    lng: 6.094477,
};

const options = {
    backgroundColor: "light blue",
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    minZoom: 3,
    maxZoom: 6,
};

const optionsBlack = {
    backgroundColor: "light blue",
    styles: mapStylesBlack,
    disableDefaultUI: true,
    zoomControl: true,
    minZoom: 3,
    maxZoom: 6,
};
  
const mapContainerStyle = {
    height: "100vh",
};

const pathOptions = {
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 4
};

function MapView(props) {
    
    function renderPolyline(trip) {
        const myTripsPathOptions = {
            geodesic: true,
            strokeColor: trip[1],
            strokeOpacity: 1.0,
            strokeWeight: 4
        };

        if(trip[2] === false) {
            return;
        }

        return  <div key={trip[1]}>
                    <Polyline 
                        path={trip[0]}
                        options={myTripsPathOptions}
                    />
                    <Marker
                        position={trip[0][0]}
                        label={trip[3]}
                    />
                </div> 
    }

    function rotateMapStiles(){
        var button = document.getElementById("CangeMapLookToggleButton");
    
        if(button.value === "Black" ){
            props.mapRef.current.setOptions(options);
            button.value = "White";
        }

        else if(button.value === "White" ){
            props.mapRef.current.setOptions(optionsBlack);
            button.value = "Black";
        }
    }

    function moveViewinMap(locationList){
        try{ props.mapRef.current.panTo(locationList.at(-1));}
        catch(error){}
     }

    return(
        <div>
        <GoogleMap 
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={3}
            center={center}
            options={options}
            onLoad={props.onMapLoad}>
            {/* Draw polyline for the new trip that is created */}
            <Polyline
                path={props.newTripPathList}
                options={pathOptions}
            /> 
            {/* Draw polyline for all trips that are in my trips */}
            {props.myTripsPathList.map(renderPolyline)}
            {/* Draw markers for the new trip that is created */}
            {props.newTripPathList.map((item, index) => {                      
                    return (
                    <Marker key= {(index+1).toString()}
                        position = {item}
                        icon = {{ url: "/BlackAndWhite-marker.png" }}
                        label = {(index+1).toString()}
                /> );     
            })}
            {/*center the map view on the place most recently chosen*/}
            {moveViewinMap(props.newTripPathList)}
        </GoogleMap>
        <motion.div 
            className="CangeMapLook"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }} >
                <button
                    className="map-button" 
                    onClick={rotateMapStiles} 
                    value="White" 
                    id="CangeMapLookToggleButton">
                        Change map style
                        <span className="logo-icon">
                            <i className="fa-solid fa-earth-americas"></i>
                        </span>
                </button>
            </motion.div>
        </div>
    );
}

export default MapView;