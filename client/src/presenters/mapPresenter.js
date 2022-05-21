import React, { useEffect, useState, useRef, useCallback } from "react";

const MapView = require("../views/mapView.js").default;

function MapPresenter(props){

    const mapRef = useRef(); // part of move mapview to chosen destination

    const onMapLoad = 
        useCallback(
            (map) => { // part of move mapview to chosen destination
                mapRef.current = map; // part of move mapview to chosen destination
            }, 
        []);

    const [newTripPathList, setNewTripPathList] = useState([]);
    const [myTripsPathList, setMyTripsPathList] = useState([]);

    useEffect(observerCB, []);

    function observerCB(){     
        props.model.addObserver(getCurrentPathCB);    
        function componentDiesCB() {
            props.model.removeObserver(getCurrentPathCB);
        }
        return componentDiesCB;
    }

    function getMyTripsPathListCB() {
        
        if(props.model.myTripsList === 0) {
            setMyTripsPathList([]);
            return;
        }

        var myList = JSON.parse(JSON.stringify(props.model.myTripsList));
        var temp = []
        var temp_color = []
        var temp_show = []
        var temp_name = []

        myList.forEach(item => {
            temp_color.push(item.color)
            temp_show.push(item.show)
            temp_name.push(item.name)
        });

        for(var i = 0; i<myList.length; i++) {
            var latLng = [[],[],[]];
            myList[i].locations.forEach(item => {
                delete item['name'];
                latLng[0].push({lat: item["lat"], lng: item["lng"]})
            });

            latLng[1] = temp_color[i]
            latLng[2] = temp_show[i]
            latLng[3] = temp_name[i]
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
        getMyTripsPathListCB();
    }

    return(
        <> {props.value && 
            <MapView
                newTripPathList = {newTripPathList}
                myTripsPathList = {myTripsPathList}
                onMapLoad = {onMapLoad}
                mapRef = {mapRef}
            />
        }</>
    );
}

export default MapPresenter;