import { FundViewOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
// import "../styles/presenters.css";

const StatisticsView = require("../views/statisticsView.js").default;

function StatisticsPresenter(props) {

    useEffect(listChangedCB ,[props.model.myTripsList]);

    function listChangedCB(){
        getNumberOfPlacesCB();
        getTotalKM();
    }

    const [isVisible, setIsVisible] = useState();
    const [numberOfPlaces, setNumberOfPlaces] = useState();
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
                if(!listOfPlaces.includes(location["name"])) {
                    listOfPlaces.push(location["name"]);
                }
            }
            trip.locations.forEach(addToListCB);
        }
        var temp = props.model.myTripsList;
        var listOfPlaces = [];
        temp.map(updateListOfPlaces)
        setNumberOfPlaces(listOfPlaces.length);
        
        return listOfPlaces.length;        
    }

    return(
        <div className="statistics-presenter">
            <div className="sidebar-titles" onClick={setVisibleCB}>
                STATISTICS
            </div>
            {isVisible && <StatisticsView myTripsList={props.model.myTripsList}
                numberOfPlaces = {numberOfPlaces}
                totalDistance = {totalDistance} />}
        </div>
    );
}

export default StatisticsPresenter;
