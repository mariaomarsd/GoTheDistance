import { useState } from "react";

function SaveTripPopup(props){

    // const [name, setName] = useState("");

    function getName() {
        var name = document.getElementById("tripName").value;
        props.confirm(name)
    }

    return(
        <div className="save-trip-component">
            Give your trip a fun name
            <input
                placeholder="Name your trip"
                id="tripName"
            />
            <button onClick={props.cancel}>cancel</button>
            <button onClick={getName}>confirm</button>
        </div>
    );
}

export default SaveTripPopup;