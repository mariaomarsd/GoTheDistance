import React, { useState } from "react";

const NewTripPresenter = require("../presenters/newTripPresenter.js").default;
const MyTripsPresenter = require("../presenters/myTripsPresenter.js").default;
const StatisticsPresenter = require("../presenters/statisticsPresenter.js").default;
const ProfilePresenter = require("../presenters/profilePresenter.js").default;

function SidebarView(props) {

    const [visibleList, setVisibleList] = useState([false, false, false, false])

    function setVisibleCB(id) {
        visibleList[id] = !visibleList[id]
        setVisibleList(visibleList)
    }

    return(
        <div className="sidebar-view">
           <div className="sidebar-item" >
                {props.value && <NewTripPresenter
                    model = {props.model}
                    visible={visibleList}
                    setVisible={setVisibleCB}
                />}
           </div>
           <div className="sidebar-item">
               <MyTripsPresenter
                    model={props.model}
                    // visible={false}
                    visible={visibleList}
                    setVisible={setVisibleCB}
               />
           </div>
           <div className="sidebar-item">
               <StatisticsPresenter 
                    model={props.model}
                    // visible={false}
                    visible={visibleList}
                    setVisible={setVisibleCB}
                />
           </div>
           <div className="sidebar-item">
               <ProfilePresenter 
                    model={props.model}
                    // visible={false}
                    visible={visibleList}
                    setVisible={setVisibleCB}
                />
           </div>
        </div>
    );
}

export default SidebarView;