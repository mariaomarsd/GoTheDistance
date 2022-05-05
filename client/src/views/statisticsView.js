import React from "react";

function StatisticsView(props) {

    // function getSTat() {
    //     console.log("STAT VIEW DIS", props.stat)
    // }

    return(
        <div className="statistic-view">
            STATISTIC FOR USERS TRIPS
            <div className="distance-travelled">
                <div className="statistic-title">
                    Distance Travelled
                </div>
                <div className="statistic-number">
                    {props.stat.toFixed(2)}
                </div>
            </div>
        </div>
    );
}

export default StatisticsView;