import React, { useEffect, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { motion, Reorder } from "framer-motion";
import SearchBar from "../components/searchbarComponent.js";

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

// import { useState } from "react";

// function SaveTripPopup(props){

//     function getName() {
//         var name = document.getElementById("trip-name").value;
//         props.confirm(name)
//     }

//     return(
//         <div className="save-trip-container">
//             <div className="save-trip-title">
//                 Give your trip a fun name
//             </div>
//             <input
//                 placeholder="Name your trip"
//                 id="trip-name"
//             />
//             <div className="save-trip-button-container">
//                 <button onClick={props.cancel} className="new-trip-button" id="cancel" >Cancel</button>
//                 <button onClick={getName} className="new-trip-button" id="confirm">Confirm</button>
//             </div>
//         </div>
//     );
// }

// export default SaveTripPopup;