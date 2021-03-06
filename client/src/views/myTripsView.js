import React, { useState } from "react";
import ConfirmDelete from '../components/confirmDelete.js'

function MyTripsView(props) {
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [tripToDelete, setTripToDelete] = useState()

    function click(id) {
        var temp = props.myTripsList.indexOf(id, 0);
        props.setVisibleTrips(temp);
    }

    function editTripCB(item){
        props.editTrip(item);
    }

    function deleteTripCB(item){
        setConfirmVisible(true)
        setTripToDelete(item)
    }

    function cancel() {
        setConfirmVisible(false)
    }

    function confirm() {
        setConfirmVisible(false)
        props.confirmDelete(tripToDelete)
    }

    function renderItemsCB(item) {
        return <div className="my-trips-item" key={item.name}>
                    <div onClick={() => click(item)} className="my-trip-checkbox">
                        <input type="checkbox" readOnly checked={item.show} className="my-trips-item-check" />
                        <div className="my-trips-item-name">
                            {item.name} 
                        </div>
                    </div>
                    <div className="my-trip-icon-container">
                        <div className="edit-icon" onClick={() => editTripCB(item)}>
                            <i className="fa-solid fa-pencil" style={{ color:"rgb(191, 109, 86)" }}></i>
                        </div>
                        <div onClick={() => deleteTripCB(item)} className="delete-icon">
                            <i className="fa-solid fa-trash-can" style={{ color:"rgb(191, 109, 86)" }}></i>
                        </div>
                    </div>
                </div>
    }

    return(
        <div className="my-trips-view">
            <div className="scroll">
                {props.myTripsList.length === 0 ? <div>You have no trips</div> :
                <ul className="my-trips-item-list">
                    {props.myTripsList.map(renderItemsCB)}
                </ul>}   
            </div>
            {confirmVisible && <ConfirmDelete cancel={cancel} confirm={confirm}/>}
        </div>
    );
}

export default MyTripsView;