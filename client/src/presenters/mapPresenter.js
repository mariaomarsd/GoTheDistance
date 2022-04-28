import React, { useEffect, useState, useRef, useCallback } from "react";
import {GoogleMap,useLoadScript,Polyline} from "@react-google-maps/api";
import mapStyles from "../mapStyles";

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

const pathOptions = {
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 4
  };

function MapPresenter(props){
    
 
    const mapRef = useRef(); // part of move mapview to chosen destination

    const onMapLoad = useCallback((map) => { // part of move mapview to chosen destination
        mapRef.current = map; // part of move mapview to chosen destination
    }, []);

    const [test, setTest] = useState(props.model.newTripsLocationList);
    
    useEffect(observerCB, []);

    function observerCB(){
        props.model.addObserver(getCurrentPathCB);
        function componentDiesCB() {
            props.model.removeObserver(getCurrentPathCB);
        }
        // called when the component is taken down
        return componentDiesCB;
    }

    function getCurrentPathCB() {
        //const pathList = test; 
        
        test.forEach(item => {
            delete item['name'];
        });
        console.log("ourPathList:", test);
        //setTest(pathList);
    }

    return(
          <div>
              {/* <button onClick={getCurrentPath}>test</button> */}
              {props.value && <GoogleMap id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={3}
                center={center}
                options={options}
                onLoad={onMapLoad}>
                 <Polyline
                    path={test}
                    options={pathOptions}/> 
                </GoogleMap>}
          </div>
      );
}

export default MapPresenter;