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

    useEffect(listChangedCB ,[props.model.myTripsList]);

    function listChangedCB(){
        getStatisticsFromTripsCB();
        getTotalKM();
    }

    const [isVisible, setIsVisible] = useState();
    const [numberOfPlaces, setNumberOfPlaces] = useState();
    const [numberOfCountries, setNumberOfCountries] = useState();
    const [totalDistance, setTotalDistance] = useState();
    const [getListOfPlaces, setListOfPlaces] = useState();
    const [getListOfCountries, setListOfCountries] = useState();
    
    function setVisibleCB() {
        props.setVisible(2)
        setIsVisible(props.visible[2]);
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
                    let text = location["name"];
                    var  splitArray = text.split(",");
                    tempArray = splitArray.pop();
                    if(!listOfCountries.includes(tempArray)){
                       listOfCountries.push(tempArray);
                    }
                }
            }
            trip.locations.forEach(addToListsCB);
        }
        var temp = props.model.myTripsList;
        var listOfPlaces = [];
        var listOfCountries = [];
        var tempArray = [];
       
        temp.map(updateStatisticsLists);
        
        setNumberOfPlaces(listOfPlaces.length);
        setListOfPlaces(listOfPlaces);
        setNumberOfCountries(listOfCountries.length);
        setListOfCountries(listOfCountries);
       
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
                <i className="fa-solid fa-arrow-trend-up" id="sidebar-icon" style={{ color:"pink" }}></i>
                <div className="sidebar-name">
                    STATISTICS
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
