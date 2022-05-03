import React, { useEffect, useState } from "react";

function MyTripsView(props) {

    useEffect(listChangedCB ,[props.myTripsList])

    const [visableList, setVisibleList] = useState([props.myTripsList])
    // const [allMyTrips, setAllMyTrips] = useState([props.myTripsList])

    function listChangedCB(){
        // console.log("EFTIR ÞETTA",props.myTripsList);
        getVisibleList();
    }

    function renderItemsCB(item) {
        return <div className="my-trips-item" key={item.name}>
                    <input className="my-trips-item-check" type="checkbox"></input>
                    <div className="my-trips-item-name">
                        {item.name}
                    </div>
                </div> 
    }

    function getVisibleList() {
        var tempList = [];
        for(let i = 0; i<props.myTripsList.length; i++) {
            // console.log("NOW", props.myTripsList[i].show)
            if(props.myTripsList[i].show){
                // var tempVar = props.myTripsList[i].show
                tempList.push(props.myTripsList[i].show)
                // console.log("NAME", props.myTripsList[i].name)
            }
        }
        console.log("TEMOP LIST", tempList)
        // props.setVisibleTrips(0);
        setVisibleList(tempList)
    }

    function changeVisability() {
        props.setVisibleTrips(0);
    }
    
    return(
        <div className="my-trips-view">
            {props.myTripsList.length === 0 ? <div>You have no trips</div> :
            <ul className="my-trips-item-list">
                {props.myTripsList.map(renderItemsCB)}
            </ul>}
            <button onClick={changeVisability}>TEST</button>
        </div>
    );
}

export default MyTripsView;