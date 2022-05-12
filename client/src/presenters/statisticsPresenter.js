import { FundViewOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StatisticsView = require("../views/statisticsView.js").default;

const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

function StatisticsPresenter(props) {

    const [isVisible, setIsVisible] = useState(props.model.sidebartoggle[2]);
    const [numberOfPlaces, setNumberOfPlaces] = useState();
    const [numberOfCountries, setNumberOfCountries] = useState();
    const [totalDistance, setTotalDistance] = useState();
    const [getListOfPlaces, setListOfPlaces] = useState();
    const [getListOfCountries, setListOfCountries] = useState();

    useEffect(listChangedCB ,[]);

    function listChangedCB(){
        props.model.addObserver(doSomethingCB)
    }

    function doSomethingCB(){
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
        var tempArray = [];
        temp.map(updateStatisticsLists);
        listOfPlaces.map(getListOfCountriesCB);
        
        setListOfPlaces(listOfPlaces);
        setNumberOfPlaces(listOfPlaces.length);
        setListOfCountries(listOfCountries);
        setNumberOfCountries(listOfCountries.length);
       
        return listOfPlaces.length, listOfCountries.length, listOfPlaces, listOfCountries;        
    }

    return(
        <motion.div className="statistics-presenter" variants={props.variants} >
            <motion.div 
                className="sidebar-titles"
                onClick={setVisibleCB}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }} 
            >
                <i className="fa-solid fa-arrow-trend-up" id="sidebar-icon" style={{ color:"rgb(163 112 89)" }}></i>
                <div className="sidebar-name" style={{color: "rgb(163 112 89)", borderColor:"rgb(163 112 89)" }}>
                    Statistics
                </div>
            </motion.div>
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
