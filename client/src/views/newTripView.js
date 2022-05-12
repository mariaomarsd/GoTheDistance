import React, { useState } from "react";

function NewTripView(props) {
    const [visible, setVisisble] = useState(true);

    function saveTripNameACB() {
        var name = document.getElementById("trip-name").value;
        props.saveTripName(name);
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
                        <button onClick={closeForm} className="new-trip-button" id="close" >Cancel</button>
                        <span className="confirm">
                            <button onClick={saveTripNameACB} className="new-trip-button" id="save">Confirm</button>
                        </span>
                    </div>
                </div>
            }
        </div>
    );
}

export default NewTripView;
