import React, { useEffect, useState } from "react";
import * as geometry from 'spherical-geometry-js';
import randomColor from "randomcolor";
import { motion } from "framer-motion";
import WarningMessage from "../components/warningMessage.js";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";


const NewTripView = require("../views/newTripView.js").default;
const EditNewTripView = require("../views/editTripView.js").default;
const SidebarTitleComponent = require("../components/sidebarTitleComponent.js").default;

function NewTripPresenter(props) {
    
    const [locationList, setLocationList] = useState(props.model.newTripsLocationList);
    const [isVisible, setIsVisible] = useState(props.model.sidebartoggle[0]);
    const [addLocationsVisible, setAddLocationsVisible] = useState(false);
    const [isNewTripVisible, setIsNewTripVisible] = useState();
    const [tripName, setTripName] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [warningMessageVisible, setWarningMessageVisible] = useState(false);

    const {
        ready, // is it set up and redy to go with libraries, see above  in app function
        suggestions: { status, data }, // what is the data from these suggestions
        setValue 
    } = usePlacesAutocomplete();

    useEffect(observerCB, []);

    function observerCB(){
        props.model.addObserver(setLocationListCB);
        function componentDiesCB() {
            props.model.removeObserver(setLocationListCB);
        }
        return componentDiesCB;
    }
    
    function setLocationListCB() {
        setLocationList(props.model.newTripsLocationList);
        setIsVisible(props.model.sidebartoggle[0]);
    }

    async function selectPlace(address) {
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            const temp_results = (results[0].formatted_address).split(',')
            const temp_place = temp_results[0] + ", " + temp_results.pop()
            return {id: Math.random(),name: temp_place, lat: lat, lng: lng};
        } catch (error) {
            console.log(" Error: ", error);
        }
    }

    function addToNewTripACB(item) {
        // to prevent putting in the same place twice in a row
        if((props.model.newTripsLocationList.length === 0 )){
            props.model.addToNewTrip(item);
        }
        else if (item.name !== props.model.newTripsLocationList.at(-1).name) { 
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
        return distanceLength/1000;
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
        setWarningMessageVisible(true)
        setTimeout(function() {setWarningMessageVisible(false) }, 2500)
    }
    
    return(
        <motion.div className="new-trip-presenter" variants={props.variants} >
            <SidebarTitleComponent
                setVisible = {setVisibleCB}
                icon = {"fa-solid fa-route"}
                color = {"rgb(85, 55, 46)"}
                title = {"New trip"}
            />
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
                selectPlace = {selectPlace}
                data={data}
                status={status}
                setValue={setValue}
                ready={ready}
            />
            }
            {warningMessageVisible && <WarningMessage warning = {errorMessage}/>}
            </>
            }
        </motion.div>
    );
}

export default NewTripPresenter;
