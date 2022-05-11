import React, { useEffect, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { motion, Reorder } from "framer-motion";
import SearchBar from "../components/searchbarComponent.js";
import SaveTripPopup from "../components/saveTripComponent.js";

function NewTripView(props) {
    const [visible, setVisisble] = useState(true);
    // const [confirmVisible, setConfirmVisible] = useState(false);

    function saveTripNameACB(name) {
        props.saveTripName(name);
        setVisisble(false);
    }

    function closeModal() {
        setVisisble(false);
    }
    
    return(
        <div className="new-trip-view">
            {visible && <SaveTripPopup confirm={saveTripNameACB} cancel={closeModal}/>}
        </div>
    );
}

export default NewTripView;