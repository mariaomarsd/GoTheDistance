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
                    {props.myTripsList[0].distanceTravelled.toFixed(2)}
                </div>}
            </div>
        </div>
    );
}

export default StatisticsView;