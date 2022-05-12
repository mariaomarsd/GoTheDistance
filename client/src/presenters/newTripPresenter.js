import React, { useEffect, useState } from "react";
import * as geometry from 'spherical-geometry-js';
import randomColor from "randomcolor";
// import {testReadFromDatabase} from "../firebaseModel";
import { motion } from "framer-motion";
import ListWarning from "../components/listTooShort";

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
    const [isVisible, setIsVisible] = useState(props.model.sidebartoggle[0]);
    const [addLocationsVisible, setAddLocationsVisible] = useState(false);
    const [isNewTripVisible, setIsNewTripVisible] = useState();
    const [tripName, setTripName] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [listwarningVisible, setListWarningVisible] = useState(false);

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
        setIsVisible(props.model.sidebartoggle[0]);
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
        setErrorMessage("Trip needs to have at least two stops!");
        setlistwarningCD();
       }else{
        item.name = tripName; 
        item.distanceNewTrip = calculateDistanceCB();
        item.color = randomColor();
        props.model.saveTrip(item);
        props.setVisible(0)
        setIsVisible(false);
        props.confirmation()
        setAddLocationsVisible(false);
       }
    }

    function setVisibleCB() {
        props.setVisible(0);
        setIsNewTripVisible(true);
        setAddLocationsVisible(false);
        setErrorMessage("");
        props.model.emptyLocationList();
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
        var nameTaken =  false;
        var temp = props.model.myTripsList;
        for(var i = 0; i<temp.length; i++) {
            if (temp[i].name === name) {
                nameTaken = true;
            }
        }

        if(name !== "" && !nameTaken) {
            setTripName(name);
            setIsNewTripVisible(false);
            setAddLocationsVisible(true);
            setErrorMessage("");
        }

        else {
            if(name === "") {
                setErrorMessage("Give your trip a name");
                setlistwarningCD();
                return;
            }
            if (nameTaken) {
                setErrorMessage("You already have a trip named " + name);
                setlistwarningCD();
                return;
            }
        }
    }

    function cancelCB(){
        props.model.emptyLocationList();
        setAddLocationsVisible(false);
    }

    function cancelSetNameCB(){
        setIsNewTripVisible(false);
    }

    function setlistwarningCD(){
        setListWarningVisible(true)
        setTimeout(function() {setListWarningVisible(false) }, 2500)
    }
    
    return(
        <motion.div className="new-trip-presenter" variants={props.variants} >
            <motion.div 
                className="sidebar-titles"
                onClick={setVisibleCB}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }} 
            >
                <i className="fa-solid fa-route" id="sidebar-icon" style={{ color:"rgb(85, 55, 46)" }} ></i>
                <div className="sidebar-name" style={{color:"rgb(85, 55, 46)", borderColor:"rgb(85, 55, 46)" }} >
                    New Trips
                </div>
            </motion.div>
            {isVisible && <>
            {isNewTripVisible && <NewTripView
                saveTripName = {setTripNameCB}
                cancelSetName = {cancelSetNameCB}
            />}
            {addLocationsVisible && <EditNewTripView
                locationList={locationList} 
                addToTrip={addToNewTripACB}
                removeFromTrip={removeFromNewTripACB}
                confirmTrip={saveTripACB}
                updateOrder={updateOrderACB}
                cancel={cancelCB}
            />
            }
            {listwarningVisible && <ListWarning warning = {errorMessage}/>}
            </>
            }
        </motion.div>
    );
}

export default NewTripPresenter;
