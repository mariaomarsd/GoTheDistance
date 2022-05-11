import React, { useEffect, useState } from "react";
import * as geometry from 'spherical-geometry-js';
import randomColor from "randomcolor";
import {testReadFromDatabase} from "../firebaseModel";
import { motion } from "framer-motion";

const NewTripView = require("../views/newTripView.js").default;
const EditNewTripView = require("../views/editTripView.js").default;

const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };
  

function NewTripPresenter(props) {
    
    const [locationList, setLocationList] = useState(props.model.newTripsLocationList);
    const [isVisible, setIsVisible] = useState();
    const [addLocationsVisible, setAddLocationsVisible] = useState(false);
    const [tripName, setTripName] = useState();

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
    }

    function removeFromNewTripACB(id) {
        props.model.removeFromNewTrip(id)
    }

    function updateOrderACB(item) {
        props.model.newOrder(item)
    }

    function saveTripACB(item) {
        if(item.locations.length<2){
            // let user know there needs to be more than one stop
        //console.log("Trip has to be more than one stop")
        props.listWarning()
       }else{
        console.log("item")
        console.log(item)
        item.name = tripName; 
        item.distanceNewTrip = calculateDistanceCB();
        item.color = randomColor();
        props.model.saveTrip(item);
        props.setVisible(0)
        setIsVisible(props.visible[0]);
        props.confirmation()
        setAddLocationsVisible(false);
       }
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

    function setTripNameCB(name) {
        setTripName(name);
        setAddLocationsVisible(true);
    }
    
    return(
        <motion.div className="new-trip-presenter" variants={props.variants} >
            <motion.div 
                className="sidebar-titles"
                onClick={setVisibleCB}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }} 
            >
                <i className="fa-solid fa-route" id="sidebar-icon" style={{ color:"rgb(184, 138, 124)" }} ></i>
                <div className="sidebar-name" style={{ borderColor:"rgb(184, 138, 124)" }} >
                    NEW TRIP
                </div>
            </motion.div>
            <div>   
                {isVisible && <div><NewTripView
                    saveTripName = {setTripNameCB}
                />
                {addLocationsVisible && <EditNewTripView
                    locationList={locationList} 
                    addToTrip={addToNewTripACB}
                    removeFromTrip={removeFromNewTripACB}
                    confirmTrip={saveTripACB}
                    updateOrder={updateOrderACB}
                />
                }
                </div>
                }
            </div>
        </motion.div>
    );
}

export default NewTripPresenter;
