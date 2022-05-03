import React, { useState, useEffect } from "react";
import Confirm from "../components/confirm.js";


const NewTripPresenter = require("../presenters/newTripPresenter.js").default;
const MyTripsPresenter = require("../presenters/myTripsPresenter.js").default;
const StatisticsPresenter = require("../presenters/statisticsPresenter.js").default;
const ProfilePresenter = require("../presenters/profilePresenter.js").default;
const SignUpPresenter = require("../presenters/signUpPresenter.js").default;


function SidebarView(props) {

    const [visibleList, setVisibleList] = useState([false, false, false, false])

    const [confirmationVisible, setConfirmationVisible] = useState(false)

    function setVisibleCB(id) {
        visibleList[id] = !visibleList[id]
        setVisibleList(visibleList)
    }

    function setConfirmationCB() {
        // console.log('NUNA')
        setConfirmationVisible(true)
        setTimeout(function() {setConfirmationVisible(false) }, 2500)
    }

    // function testing() {
    //     const encodeString = google.maps.geometry.encoding.encodePath(path)
    // }

    return(
        <div className="sidebar-view">
           <div className="sidebar-item" >
                {props.value && <NewTripPresenter
                    model = {props.model}
                    visible={visibleList}
                    setVisible={setVisibleCB}
                    confirmation={setConfirmationCB}
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
          <div>
               <SignUpPresenter model = {props.model}/>
          </div>
          {confirmationVisible && <Confirm />}
          {/* <button onClick={testing}>
              TESTING
          </button> */}
        </div>
    );
}

export default SidebarView;