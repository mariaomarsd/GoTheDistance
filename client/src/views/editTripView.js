import React, { useState } from "react";
import { Reorder } from "framer-motion";
import SearchBar from "../components/searchbarComponent.js";

function EditNewTripView(props){
    const [chosen, setChosen] = useState();

    async function selectPlace(address) {
        const results = await props.selectPlace(address);
        setChosen(results);
        console.log(results);
    }

    function addToTripACB() {
        if(chosen === undefined) {
        }
        else {
            props.addToTrip(chosen);
        }
    }

    function removeFromTripACB(id) {
        props.removeFromTrip(id);
    }

    function saveTripACB() {
        props.confirmTrip({locations: props.locationList, show: true, color: ""});
    }

    function updateOrdertest() {
        props.updateOrder(props.locationList)
    }
    
    function cancelCB(){
        props.cancel();
    }
    
    return(
        <div className="edit-trip-view">
          <div className="search-component">
            <SearchBar 
                selectPlace={selectPlace}
                data={props.data}
                status={props.status}
                setValue={props.setValue}
                ready={props.ready}
            />
            <button className="new-trip-button" id="add" onClick={addToTripACB}>
                Add
            </button>
        </div>
        <div className="scroll">
            <Reorder.Group className="new-trips-item-list" values={props.locationList} onReorder={props.setItems}>
            { props.locationList.map((item) => { updateOrdertest()
                return <Reorder.Item className="new-trip-item" key={item.id} value={item} >
                    <button className="new-trip-item-button" onClick={() => removeFromTripACB(item.id)}>
                        <i className="fa-solid fa-circle-xmark" style={{color: "lightblue"}}></i>
                    </button>
                    <div className="new-trip-item-name" >
                        {item.name}
                    </div>
                </Reorder.Item> })}
            </Reorder.Group>
        </div>
        <div className="new-trip-button-container">
            <button className="new-trip-button" id="close" onClick={cancelCB}>
                Cancel
            </button>
            <button className="new-trip-button" id="save" onClick={saveTripACB}>
                Save Trip
            </button>
            </div>
        </div>
    );
}

export default EditNewTripView;