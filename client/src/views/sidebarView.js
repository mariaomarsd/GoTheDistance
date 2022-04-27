import React from "react";


const NewTripPresenter = require("../presenters/newTripPresenter.js").default;
//const MyTripsPresenter = require("../presenters/myTripsPresenter.js").default;


function SidebarView(props) {
    return(
        <div className="sidebar-view">
           <div>
                <NewTripPresenter
                    model = {props.model}
                    // newTripsLocationList={props.newTripsLocationList} 
                    // addToNewTrip={props.addToNewTrip}
                    // removeFromNewTrip={props.removeFromNewTrip}
                    // saveTrip={props.saveTrip}
                />
           </div>
           <div>
               {/* <MyTripsPresenter
                    myTripsList={props.myTripsList}
                    setVisableTrips={props.setVisableTrips}
               /> */}
           </div>
        </div>
    );
}

export default SidebarView;