import React from "react";
// import { animate, motion, useMotionValue } from "framer-motion";
import Counter from "../components/counter.js"

function StatisticsView(props) {
    return(
        <div className="statistic-view">
            <div className="distance-travelled">
                <div className="statistic-title">
                    Distance Travelled
                </div>
                {props.myTripsList.length === 0 ? <div>0.0 km</div> :
                <div className="statistic-number">
                    {/* {props.totalDistance.toFixed(2)} */}
                    <Counter from={0} to={props.totalDistance} />
                </div> }
                <div className="statistic-title">
                    Places visited
                </div>
                <div className="statistic-number">
                    {/* <p>{props.numberOfPlaces}</p> */}
                    <Counter from={0} to={props.numberOfPlaces} />
                </div>
            </div>
        </div>
    );
}

export default StatisticsView;