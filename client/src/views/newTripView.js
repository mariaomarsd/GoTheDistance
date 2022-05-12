import React from "react";

function NewTripView(props) {

    function saveTripNameACB() {
        var name = document.getElementById("trip-name").value;
        props.saveTripName(name);
    }

    function closeForm() {
        props.cancelSetName();
    }
    
    return(
        <div className="new-trip-view">
            <div className="info-search">
                Give your trip a name!
            </div>
            <input className="info-search"
                placeholder="Vacation 2022"
                id="trip-name"
            />
            <div className="new-trip-button-container">
                <button onClick={closeForm} className="new-trip-button" id="close" >Cancel</button>
                <span className="confirm">
                    <button onClick={saveTripNameACB} className="new-trip-button" id="save">Confirm</button>
                </span>
            </div>
        </div>
    );
}

export default NewTripView;
