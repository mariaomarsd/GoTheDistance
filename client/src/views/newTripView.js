import React, { useEffect } from "react";


function NewTripView(props) {

    useEffect(listChangedCB, [props.locationList]);

    function listChangedCB(){
        console.log(props.locationList);
    }

    function addToTripACB() {

        const lat = 3;
        const lng = 4;
        var name = document.getElementById("input").value;
        props.addToTrip({name,lat,lng});
        console.log("locationList:", props.locationList);        
    }

    function renderListItemCB(item){
        return <div>{item}</div>
    }
    
    return(
        <div className="new-trip-view">
          <div>
            <input
                placeholder="search"
                id="input"
            />
            <button onClick={addToTripACB}>
                Add To Trip!
            </button>
          </div>
          <div>
              <div>
                Current trip
              </div>
              <ul>
                  {/* {props.locationList.map(renderListItemCB)} */}
              </ul>
          </div>
        </div>
    );
}

export default NewTripView;