import React, { useEffect, useState } from "react";

function MyTripsView(props) {

    useEffect(listChangedCB ,[props.myTripsList])
    // const [test, setTest ] = useState(props.myTripsList);

    function listChangedCB(){
        // console.log("EFTIR ÞETTA",props.myTripsList);
    }

    function renderItemsCB(item) {
        // console.log("RENDER ITEMS", item)
        return <div key={item.name}> {item.name} </div>
    }
    
    return(
        <div className="my-trips-view">
            {/* <button onClick={prufa}>prufa</button> */}
            List of my trips:
            <ul>
                {props.myTripsList.map(renderItemsCB)}
            </ul>
        </div>
    );
}

export default MyTripsView;