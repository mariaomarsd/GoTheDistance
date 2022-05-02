import React, { useEffect, useState } from "react";

function MyTripsView(props) {

    useEffect(listChangedCB ,[props.myTripsList])

    function listChangedCB(){
        // console.log("EFTIR ÞETTA",props.myTripsList);
    }

    function renderItemsCB(item) {
        return <div className="my-trips-item" key={item.name}>
                    <input className="my-trips-item-check" type="checkbox"></input>
                    <div className="my-trips-item-name">
                        {item.name}
                    </div>
                </div> 
    }
    
    return(
        <div className="my-trips-view">
            {props.myTripsList.length === 0 ? <div>You have no trips</div> :
            <ul className="my-trips-item-list">
                {props.myTripsList.map(renderItemsCB)}
            </ul>}
        </div>
    );
}

export default MyTripsView;