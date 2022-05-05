import React, { useEffect, useState, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, Polyline, Marker } from "@react-google-maps/api";
import mapStyles from "../mapStyles";

const center = { // where to start the map, stockholm
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

    useEffect(observerCB, []);

    const mapRef = useRef(); // part of move mapview to chosen destination

    const onMapLoad = useCallback((map) => { // part of move mapview to chosen destination
        mapRef.current = map; // part of move mapview to chosen destination
    }, []);

    const [pathList, setPathList] = useState([]);

    function observerCB(){
        props.model.addObserver(getCurrentPathCB);
        function componentDiesCB() {
            props.model.removeObserver(getCurrentPathCB);
        }
        // called when the component is taken down
        return componentDiesCB;
    }

    function getCurrentPathCB() {
        // console.log("now", props.model.newTripsLocationList)
        // console.log("What I want", props.model.myTripsList)
        // var tempPathList = JSON.parse(JSON.stringify(props.model.newTripsLocationList));
        var temp = JSON.parse(JSON.stringify(props.model.myTripsList));
        temp.forEach(item => {
            delete item['name'];
            delete item['show'];
        });
        for(var i = 0; i<temp.length; i++) {
            console.log("TESTING", temp[i])
            temp[i].locations.forEach(item => {
                delete item['name'];
            });
        }
        console.log("What I want", temp)
        // tempPathList.forEach(item => {
        //     delete item['name'];
        // });
        setPathList(temp);
    }

    function renderListItemCB(item){
        return <Marker position={item}>
        </Marker>
    }

    return(
          <div>
              {props.value && <GoogleMap id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={3}
                center={center}
                options={options}
                onLoad={onMapLoad}>
                 {/* <Polyline
                    path={pathList}
                    options={pathOptions}/>  */}
                {/* {pathList.map(renderListItemCB)} */}
                </GoogleMap>}
          </div>
      );
}

export default MapPresenter;