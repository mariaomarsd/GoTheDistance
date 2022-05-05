import React from "react";

function StatisticsView(props) {

    return(
        <div className="statistic-view">
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