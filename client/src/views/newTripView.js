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
        setVisisble(false);
    }

    function closeForm() {
        setVisisble(false);
    }
    
    return(
        <div className="new-trip-view">
            { visible &&
                <div>
                    <div>
                        Give your trip a fun name!
                    </div>
                    <input
                        placeholder="Name your trip"
                        id="trip-name"
                    />
                    <div className="new-trip-button-container">
                        <button onClick={closeForm} className="new-trip-button" id="cancel" >Cancel</button>
                        <button onClick={saveTripNameACB} className="new-trip-button" id="confirm">Confirm</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default NewTripView;
