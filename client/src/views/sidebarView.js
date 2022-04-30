import React, { useState } from "react";

const NewTripPresenter = require("../presenters/newTripPresenter.js").default;
const MyTripsPresenter = require("../presenters/myTripsPresenter.js").default;
const StatisticsPresenter = require("../presenters/statisticsPresenter.js").default;
const ProfilePresenter = require("../presenters/profilePresenter.js").default;

function SidebarView(props) {

    const [visibleList, setVisibleList] = useState([false, false, false, false])

    function setVisibleCB(id) {
        // console.log("SET VISIBLE CB", id)
        // var test = []
        // console.log("SET VISIBLE FYRIR", visibleList)
        visibleList[id] = !visibleList[id]
        setVisibleList(visibleList)
        // console.log("VISIBILITY LIST", visibleList)
        // if(id==0){
        //     test = [!visibleList[0], false, false, false]
        // }
        // else if(id==1){
        //     test = [false, !visibleList[1], false, false]
        // }
        // else if(id==2){
        //     test = [false, false, !visibleList[2], false]
        // }
        // else if(id==3){
        //     test = [false, false, false, !visibleList[3]]
        // }
        // setVisibleList(test)
        // console.log("VISIBILITY LIST", visibleList)
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
                    visible={false}
                    visible={visibleList}
                    setVisible={setVisibleCB}
               />
           </div>
           <div className="sidebar-item">
               <StatisticsPresenter 
                    model={props.model}
                    visible={false}
                    visible={visibleList}
                    setVisible={setVisibleCB}
                />
           </div>
           <div className="sidebar-item">
               <ProfilePresenter 
                    model={props.model}
                    visible={false}
                    visible={visibleList}
                    setVisible={setVisibleCB}
                />
           </div>
        </div>
    );
}

export default SidebarView;