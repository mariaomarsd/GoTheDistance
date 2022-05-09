import React, { useEffect, useState } from "react";
import * as geometry from 'spherical-geometry-js';
import randomColor from "randomcolor";
import {testReadFromDatabase} from "../firebaseModel";


const NewTripView = require("../views/newTripView.js").default;

function NewTripPresenter(props) {
    
    const [locationList, setLocationList] = useState(props.model.newTripsLocationList);
    const [isVisible, setIsVisible] = useState();

    // called when component is created or the list changes
    useEffect(observerCB, []);

    function observerCB(){
        props.model.addObserver(setLocationListCB);
        function componentDiesCB() {
            props.model.removeObserver(setLocationListCB);
        }
       
        // called when the component is taken down
        return componentDiesCB;
    }
    
    function setLocationListCB() {
        setLocationList(props.model.newTripsLocationList);
    }

    function addToNewTripACB(item) {
        // to prevent putting in the same place twice in a row
        if((props.model.newTripsLocationList.length === 0 )){
            props.model.addToNewTrip(item);
        }
        else if (item.name != props.model.newTripsLocationList.at(-1).name) { 
            props.model.addToNewTrip(item);
        }
        // console.log('her')
    }

    function removeFromNewTripACB(id) {
        props.model.removeFromNewTrip(id)
    }

    function updateOrderACB(item) {
        props.model.newOrder(item)
    }

    function saveTripACB(item) {
        item.distanceNewTrip = calculateDistanceCB();
        item.color = randomColor();
        // console.log("ITEM",item);
        // console.log("DISTANCE:", item.distanceNewTrip)
        props.model.saveTrip(item);
        props.setVisible(0)
        setIsVisible(props.visible[0]);
        props.confirmation()
    }

    function setVisibleCB() {
        props.setVisible(0);
        setIsVisible(props.visible[0]);
    }

    function calculateDistanceCB() {
        var distanceLength = 0;
        var tempDistanceList = JSON.parse(JSON.stringify(props.model.newTripsLocationList));
        tempDistanceList.forEach(item => {
            delete item['name'];
        });
        
        for (let i = 0; i < tempDistanceList.length - 1; i++) {
            distanceLength  += geometry.computeDistanceBetween(tempDistanceList[i], tempDistanceList[i + 1]);
        }
        return distanceLength/1000 /*+ "KM"*/;
    }

    return(
        <div className="new-trip-presenter"
            >
            <div className="sidebar-titles" onClick={setVisibleCB}>
                NEW TRIP
            </div>
            <div>   
                {isVisible && <NewTripView
                    locationList={locationList} 
                    addToTrip={addToNewTripACB}
                    removeFromTrip={removeFromNewTripACB}
                    confirmTrip={saveTripACB}
                    updateOrder={updateOrderACB}
                />}
            </div>
        </div>
    );
}

export default NewTripPresenter;
