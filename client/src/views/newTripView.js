import React from "react";


function NewTripView(props) {


    function addToTripACB() {

        const lat = 3;
        const lng = 4;
        //var name = document.getElementById("input").value;
        const name = "sigga";
        console.log("newTrip",name);
        props.addToTrip({name,lat,lng});
        //props.addToTrip(name);
        console.log("locationList:", props.locationList);
        
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
                  {/* slælar*/}
              </ul>
          </div>
        </div>
    );
}

export default NewTripView;