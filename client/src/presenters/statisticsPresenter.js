import React, { useState } from "react";
// import "../styles/presenters.css";

const StatisticsView = require("../views/statisticsView.js").default;

function StatisticsPresenter(props) {

    const [isVisible, setIsVisible] = useState();
    
    function setVisibleCB() {
        props.setVisible(2)
        setIsVisible(props.visible[2]);
    }

    return(
        <div className="statistics-presenter">
            <div className="sidebar-titles" onClick={setVisibleCB}>
                STATISTICS
            </div>
            {isVisible && <StatisticsView myTripsList={props.model.myTripsList} />}
        </div>
    );
}

export default StatisticsPresenter;
