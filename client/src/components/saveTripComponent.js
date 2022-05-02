// import { useState } from "react";

function SaveTripPopup(props){

    function getName() {
        var name = document.getElementById("trip-name").value;
        props.confirm(name)
    }

    return(
        <div className="save-trip-container">
            <div className="save-trip-title">
                Give your trip a fun name
            </div>
            <input
                placeholder="Name your trip"
                id="trip-name"
            />
            <div className="save-trip-button-container">
                <button onClick={props.cancel} className="new-trip-button" id="cancel" >Cancel</button>
                <button onClick={getName} className="new-trip-button" id="confirm">Confirm</button>
            </div>
        </div>
    );
}

export default SaveTripPopup;