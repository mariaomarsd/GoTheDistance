import React, { useEffect, useState } from "react";
// import { Checkbox } from 'antd';

function MyTripsView(props) {

    useEffect(listChangedCB ,[props.myTripsList])

    const [visableList, setVisibleList] = useState([props.myTripsList]);

    function listChangedCB(){
        getVisibleList();
    }

    function click(id) {
        // console.log('ONCLICK', id)
        var temp = props.myTripsList.indexOf(id, 0);
        props.setVisibleTrips(temp);
        getVisibleList()
    }

    function editTripCB(item){
        props.editTrip(item);
        console.log(item);
    }

    function deleteTripCB(item){
        console.log("TRIP TO DELETE", item)
        props.model.deleteMyTrip(item)
    }

    function renderItemsCB(item) {
        return <div className="my-trips-item">
                    <div onClick={() => click(item)}  key={item.name} >
                        <input type="checkbox"  readOnly checked={item.show} className="my-trips-item-check" />
                        <div className="my-trips-item-name">
                            {item.name} 
                        </div>
                    </div>
                        <button className="edit-button" onClick={() => editTripCB(item)}>
                            <div className="edit-icon">
                                <i className="fa-solid fa-pencil" style={{ color:"rgb(184, 138, 124)" }}></i>
                            </div>
                        </button>
                        <button onClick={() => deleteTripCB(item)}>
                            <i className="fa-solid fa-trash-can" style={{ color:"rgb(184, 138, 124)" }}></i>
                        </button>
                    
                    
                    {/* <div onClick={() => click(item)} className="my-trips-item" key={item.name} >
                        {/* <Checkbox checked={item.show} className="my-trips-item-check"/> */}
                        {/* <input type="checkbox" readOnly checked={item.show} className="my-trips-item-check" />
                        <div className="my-trips-item-name">
                            {item.name}
                        </div>
                        <button className="edit-button" onClick={() => editTripCB(item)}>
                    <i className="fa-solid fa-pencil"></i>
                    </button>
                    </div> */} 
                   
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
            <div className="scroll">
                {props.myTripsList.length === 0 ? <div>You have no trips</div> :
                <ul className="my-trips-item-list">
                    {props.myTripsList.map(renderItemsCB)}
                </ul>}
            </div>
        </div>
    );
}

export default MyTripsView;