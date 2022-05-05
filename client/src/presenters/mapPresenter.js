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

    const [newTripPathList, setNewTripPathList] = useState([]);
    const [myTripsPathList, setMyTripsPathList] = useState([]);

    function observerCB(){
        props.model.addObserver(getCurrentPathCB);
        function componentDiesCB() {
            props.model.removeObserver(getCurrentPathCB);
        }
        // called when the component is taken down
        return componentDiesCB;
    }

    function getMyTripsPathListCB() {
        var temp = JSON.parse(JSON.stringify(props.model.myTripsList));
        var test = Array(temp.length).fill([])
        temp.forEach(item => {
            delete item['name'];
            delete item['show'];
            delete item['distanceNewTrip'];
        });
        for(var i = 0; i<temp.length; i++) {
            temp[i].locations.forEach(item => {
                delete item['name'];
                console.log("length", test)
                test[i].push({lat: item["lat"], lng: item["lng"]})
            });
        }
        setMyTripsPathList(test);
    }

    function getCurrentPathCB() {
        var tempPathList = JSON.parse(JSON.stringify(props.model.newTripsLocationList));
        tempPathList.forEach(item => {
            delete item['name'];
        });
        setNewTripPathList(tempPathList);
        if(props.model.myTripsList.length !== 0) {
            getMyTripsPathListCB();
        }
    }

    function renderMarkers(item){
        try {
        var number = 0;
        number++;
        var s = number.toString();
         }catch(error){}
        return(
                <Marker key= {s}
                    position = {item}
                    icon = {{ url: "/BlackAndWhite-marker.png" }}
                    label = {s}
                />
            ); 
    }

    function renderPolyline(trip) {
        var number = 0;
        number++;
        var key = number.toString();
        console.log('POLYLINE', trip)
        return <Polyline key={key} path={trip} options={pathOptions}/>
    }

    return(
          <div>
              {props.value && <GoogleMap id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={3}
                center={center}
                options={options}
                onLoad={onMapLoad}>
                <Polyline
                    path={newTripPathList}
                    options={pathOptions}
                /> 
                {/* {!props.inNewTrip && props.model.myTripsList.map(renderPolyline)} */}
                {myTripsPathList.map(renderPolyline)}
                {/* {pathList.map(renderListItemCB)} */}
                    {/* options={pathOptions}/>  */}
                {newTripPathList.map(renderMarkers)}
                </GoogleMap>}
          </div>
      );
}

export default MapPresenter;