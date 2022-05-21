import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StatisticsView = require("../views/statisticsView.js").default;
const SidebarTitleComponent = require("../components/sidebarTitleComponent.js").default;

function StatisticsPresenter(props) {

    const [isVisible, setIsVisible] = useState(props.model.sidebartoggle[2]);
    const [numberOfPlaces, setNumberOfPlaces] = useState();
    const [numberOfCountries, setNumberOfCountries] = useState();
    const [totalDistance, setTotalDistance] = useState();
    const [getListOfPlaces, setListOfPlaces] = useState();
    const [getListOfCountries, setListOfCountries] = useState();

    useEffect(listChangedCB ,[]);

    function listChangedCB(){
        props.model.addObserver(updateStatisticsCB)
        function componentDiesCB(){
            props.model.removeObserver(updateStatisticsCB)
        }
        return componentDiesCB;
    }

    function updateStatisticsCB(){
        getStatisticsFromTripsCB();
        getTotalKM();
        setIsVisible(props.model.sidebartoggle[2]);
    }
    
    function setVisibleCB() {
        props.setVisible(2);
    }

    function getTotalKM() {
        var totalDistance = 0;
        var tempDistanceList = JSON.parse(JSON.stringify(props.model.myTripsList));
        tempDistanceList.forEach(element => {
            totalDistance += element.distanceNewTrip;
          });
        setTotalDistance(totalDistance);
        return totalDistance;
    }

    function getStatisticsFromTripsCB() {
        function updateStatisticsLists(trip) {
            function addToListsCB(location) {
                if(!listOfPlaces.includes(location["name"])) {
                    listOfPlaces.push(location["name"]);
                }
            }
            trip.locations.forEach(addToListsCB);
        }
        function getListOfCountriesCB(place) {
            var splitArray = place.split(",");
            var countryName = splitArray.pop();
            var alreadyInList = false;
            listOfCountries.forEach((item) => {
                if(item.replace(/\s/g, '') === countryName.replace(/\s/g, '')) {
                    alreadyInList = true;
                }
            });
            if(!alreadyInList) {
                listOfCountries.push(countryName);
            }
        }

        var temp = props.model.myTripsList;
        var listOfPlaces = [];
        var listOfCountries = [];
        temp.map(updateStatisticsLists);
        listOfPlaces.map(getListOfCountriesCB);
        
        setListOfPlaces(listOfPlaces);
        setNumberOfPlaces(listOfPlaces.length);
        setListOfCountries(listOfCountries);
        setNumberOfCountries(listOfCountries.length);    
    }

    return(
        <motion.div className="sidebar-item" variants={props.variants} >
            <SidebarTitleComponent
                setVisible = {setVisibleCB}
                sidebarTitle = "Statistics"
            />
            {isVisible && <StatisticsView 
                myTripsList={props.model.myTripsList}
                numberOfPlaces = {numberOfPlaces}
                totalDistance = {totalDistance}
                numberOfCountries = {numberOfCountries}
                ListOfPlaces = {getListOfPlaces}
                ListOfCountries = {getListOfCountries}
             />}
        </motion.div>
    );
}

export default StatisticsPresenter;
