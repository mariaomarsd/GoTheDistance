import React, { useEffect, useState } from "react";
// import { Checkbox } from 'antd';

function MyTripsView(props) {

    useEffect(listChangedCB ,[props.myTripsList])

    const [visableList, setVisibleList] = useState([props.myTripsList]);

    function listChangedCB(){
        getVisibleList();
    }

    function click(id) {
        console.log('ONCLICK', id)
        var temp = props.myTripsList.indexOf(id, 0);
        props.setVisibleTrips(temp);
        getVisibleList()
    }

    function editTripCB(item){
        props.editTrip(item);
        console.log(item);
    }

    function renderItemsCB(item) {
        return <div>
                    <button onClick={() => editTripCB(item)}>EDIT TRIP</button>
                    <div onClick={() => click(item)} className="my-trips-item" key={item.name} >
                        {/* <Checkbox checked={item.show} className="my-trips-item-check"/> */}
                        <input type="checkbox" checked={item.show} className="my-trips-item-check" />
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
            <div>
                {props.myTripsList.length === 0 ? <div>You have no trips</div> :
                <ul className="my-trips-item-list">
                    {props.myTripsList.map(renderItemsCB)}
                </ul>}
            </div>
        </div>
    );
}

export default MyTripsView;