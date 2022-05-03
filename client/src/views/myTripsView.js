import React, { useEffect, useState } from "react";
import { Checkbox } from 'antd';

function MyTripsView(props) {

    useEffect(listChangedCB ,[props.myTripsList])

    const [visableList, setVisibleList] = useState([props.myTripsList])
    // const [allMyTrips, setAllMyTrips] = useState([props.myTripsList])

    function listChangedCB(){
        // console.log("EFTIR ÞETTA",props.myTripsList);
        getVisibleList();
    }

    function click(id) {
        console.log('ONCLICK', id)
        var temp = props.myTripsList.indexOf(id, 0)
        props.setVisibleTrips(temp);
        getVisibleList()
    }

    function renderItemsCB(item) {
        return <div className="my-trips-item" key={item.name} >
                    <div onClick={() => click(item)}> 
                        <Checkbox checked={item.show} />
                        <div className="my-trips-item-name">
                            {item.name}
                        </div>
                    </div>
                </div>
    }

    function getVisibleList() {
        var tempList = [];
        for(let i = 0; i<props.myTripsList.length; i++) {
            tempList.push(props.myTripsList[i].show)
        }
        setVisibleList(tempList)
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