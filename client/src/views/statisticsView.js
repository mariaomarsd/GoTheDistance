import React from "react";

function StatisticsView(props) {

    return(
        <div className="statistic-view">
            <div className="distance-travelled">
                <div className="statistic-title">
                    Distance Travelled
                </div>
                {props.myTripsList.length === 0 ? <div>0.0 km</div> :
                <div className="statistic-number">
                    {props.myTripsList[0].distanceNewTrip.toFixed(2)}
                    {/* {console.log("kkk", props.myTripsList[0])} */}
                </div>}
            </div>
        </div>
    );
}

export default StatisticsView;