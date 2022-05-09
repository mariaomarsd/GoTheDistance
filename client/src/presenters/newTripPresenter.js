import React, { useEffect, useState } from "react";
import * as geometry from 'spherical-geometry-js';
import randomColor from "randomcolor";


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
        props.model.addToNewTrip(item);
    }

    function removeFromNewTripACB(id) {
        props.model.removeFromNewTrip(id)
    }

    function saveTripACB(item) {
        item.distanceNewTrip = calculateDistanceCB();
        item.color = randomColor();
        console.log("ITEM",item);
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
                />}
            </div>
        </div>
    );
}

export default NewTripPresenter;
