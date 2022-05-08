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
                    {props.totalDistance.toFixed(2)}
                </div>}
                <div className="statistic-title">
                    Places visited
                </div>
                <div className="statistic-number">
                    <p>{props.numberOfPlaces}</p>
                </div>
            </div>
        </div>
    );
}

export default StatisticsView;