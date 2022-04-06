import React from "react";

function StatisticsView(){
    
    return(
    <div className="statistics-view">
        <div className="statistics-row">
            <div className="statistics-container">
                <div className="statistic-item">Distance travelled</div>
                <div className="statistic-item">16879 km</div>
            </div>
            <div className="statistics-container">
                <div>Countries visited</div>
                <div>22/195</div>
            </div>
        </div>
            <div className="statistics-row">
            <div className="statistics-container">
                <div>Places explored</div>
                <div>72</div>
            </div>
            <div className="statistics-container">
                <div>Continents</div>
                <div>3/7</div>
            </div>
        </div>

    </div>);
}

export default StatisticsView;