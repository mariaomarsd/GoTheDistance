import { FundViewOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
// import "../styles/presenters.css";
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
        getNumberOfPlacesCB();
        getTotalKM();
    }

    const [isVisible, setIsVisible] = useState();
    const [numberOfPlaces, setNumberOfPlaces] = useState();
    const [numberOfCountries, setNumberOfCountries] = useState();
    const [totalDistance, setTotalDistance] = useState();
    
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

    function getNumberOfPlacesCB() {
        function updateListOfPlaces(trip) {
            function addToListCB(location) {
                console.log("Location", location);
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
            trip.locations.forEach(addToListCB);
        }
        var temp = props.model.myTripsList;
        var listOfPlaces = [];
        var listOfCountries = [];
        var tempArray = [];
       
        console.log("PLACES", listOfPlaces);
        console.log("Countries: ", listOfCountries);
        temp.map(updateListOfPlaces)
        setNumberOfPlaces(listOfPlaces.length);
        setNumberOfCountries(listOfCountries.length);
       
        return listOfPlaces.length, listOfCountries.length;        
    }

    return(
        <motion.div className="statistics-presenter" variants={props.variants} >
            <motion.div 
                className="sidebar-titles"
                onClick={setVisibleCB}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }} 
            >
                STATISTICS
            </motion.div>
            {isVisible && <StatisticsView 
                myTripsList={props.model.myTripsList}
                numberOfPlaces = {numberOfPlaces}
                totalDistance = {totalDistance}
                numberOfCountries = {numberOfCountries} />}
        </motion.div>
    );
}

export default StatisticsPresenter;
