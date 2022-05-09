import React, { useEffect, useState, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, Polyline, Marker } from "@react-google-maps/api";
import mapStyles from "../mapStyles";
import randomColor from "randomcolor";

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
    const [color, setColor] = useState([]);

    function observerCB(){
        props.model.addObserver(getCurrentPathCB);
        function componentDiesCB() {
            props.model.removeObserver(getCurrentPathCB);
        }
        // called when the component is taken down
        return componentDiesCB;
    }

    function getMyTripsPathListCB() {
        var myList = JSON.parse(JSON.stringify(props.model.myTripsList));
        var temp = []
        var temp_color = []
        myList.forEach(item => {
            delete item['name'];
            delete item['show'];
            delete item['distanceNewTrip'];
            temp_color.push(item.color)
            // console.log("TEMpo color", temp_color)
        });
        for(var i = 0; i<myList.length; i++) {
            var latLng = [[],[]];
            myList[i].locations.forEach(item => {
                delete item['name'];
                latLng[0].push({lat: item["lat"], lng: item["lng"]})
            });
            latLng[1] = temp_color[i]
            temp.push(latLng)
        }
        setMyTripsPathList(temp);
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

    var number = 0;
    function renderMarkers(item){
        try {
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
        const myTripsPathOptions = {
            geodesic: true,
            strokeColor: trip[1],
            strokeOpacity: 1.0,
            strokeWeight: 4
        };
        console.log('POLYLINE', trip)
        return <Polyline key={trip[1]} path={trip[0]} options={myTripsPathOptions}/>
    }

    return(
          <div>
              {props.value && <GoogleMap id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={3}
                center={center}
                options={options}
                onLoad={onMapLoad}>
                {/* Draw polyline for the new trip that is created */}
                <Polyline
                    path={newTripPathList}
                    options={pathOptions}
                /> 
                {/* Draw polyline for all trips that are in my trips */}
                {myTripsPathList.map(renderPolyline)}
                {/* Draw markers for the new trip that is created */}
                {newTripPathList.map(renderMarkers)}
                </GoogleMap>}
          </div>
      );
}

export default MapPresenter;