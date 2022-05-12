import React, { useState } from "react";
// import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
// import { motion, Reorder } from "framer-motion";
// import SearchBar from "../components/searchbarComponent.js";

function NewTripView(props) {
    const [visible, setVisisble] = useState(true);
    // const [confirmVisible, setConfirmVisible] = useState(false);

    function saveTripNameACB() {
        var name = document.getElementById("trip-name").value;
        props.saveTripName(name);
        //setVisisble(false);
    }

    function closeForm() {
        props.cancelSetName();
    }
    
    return(
        <div className="new-trip-view">
            { visible &&
                <div>
                    <div className="info-search">
                        Give your trip a name!
                    </div>
                    <input className="info-search"
                        placeholder="Vacation 2022"
                        id="trip-name"
                    />
                    <div className="new-trip-button-container">
                        <button onClick={closeForm} className="new-trip-button" id="cancel" >Cancel</button>
                        <span className="confirm">
                            <button onClick={saveTripNameACB} className="new-trip-button" id="confirm">Confirm</button>
                        </span>
                    </div>
                </div>
            }
        </div>
    );
}

export default NewTripView;
