import React from "react";
import SignUpPresenter from "../presenters/signUpPresenter.js";

const NewTripPresenter = require("../presenters/newTripPresenter.js").default;
const MyTripsPresenter = require("../presenters/myTripsPresenter.js").default;

function SidebarView(props) {
    return(
        <div className="sidebar-view">
           <div>
                {props.value && <NewTripPresenter
                    model = {props.model}
                />}
           </div>
           <div>
               <MyTripsPresenter
                    // myTripsList={props.model.myTripsList}
                    // setVisableTrips={props.model.setVisableTrips}
                    model={props.model}
               />
           </div>
           <div>
               <SignUpPresenter model = {props.model}/>
           </div>
        </div>
    );
}

export default SidebarView;