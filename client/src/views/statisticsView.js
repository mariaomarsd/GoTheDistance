import React from "react";
// import { animate, motion, useMotionValue } from "framer-motion";
import Counter from "../components/counter.js"

function StatisticsView(props) {
    return(
        <div className="statistic-view">
            <div className="statistic-wrapper">
                <div className="statistic-title">
                    Distance Travelled
                </div>
                {props.myTripsList.length === 0 ? <div>0.0 km</div> :
                <div className="statistic-number">
                    <Counter from={0} to={props.totalDistance} /> km
                </div>}
            </div>
            <div className="statistic-wrapper">
                    
                <div className="statistic-title">
                    Places Visited
                </div>
                {props.myTripsList.length === 0 ? <div>0</div> :
                <div className="statistic-number">
                   <Counter from={0} to={props.numberOfPlaces} />
                </div>}
            </div>
            <div className="statistic-wrapper">
                <div className="statistic-title">
                    Countries Visited
                </div>
                {props.myTripsList.length === 0 ? <div>0</div> :
                <div className="statistic-number">
                    <Counter from={0} to={props.numberOfCountries} />
                </div>}
            </div>
        </div>
    );
}

export default StatisticsView;