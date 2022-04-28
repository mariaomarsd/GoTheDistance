import React, { useEffect, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

import SearchBar from "../components/searchbarComponent.js";
import SaveTripPopup from "../components/saveTripComponent.js";

function NewTripView(props) {

    useEffect(listChangedCB, [props.locationList]);
    const [chosen, setChosen] = useState();

    const [visible, setVisisble] = useState(false);

    const {
        ready, // is it set up and redy to go with libraries, see above  in app function
        value, // what is the current value that user is writing
        suggestions: { status, data }, // what is the data from these suggestions
        setValue 
    } = usePlacesAutocomplete();

    async function selectPlace(address) {
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            const temp_results = (results[0].formatted_address).split(',')
            const temp_place = temp_results[0] + ", " + temp_results.pop()
            setChosen({name: temp_place, lat: lat, lng: lng})

        } catch (error) {
            console.log(" Error: ", error);
        }
    }

    function listChangedCB(){
        // console.log("EFTIR ÞETTA",props.locationList);
    }

    function addToTripACB() {
        props.addToTrip(chosen);
    }

    // id is name temp
    function removeFromTripACB(id) {
        props.removeFromTrip(id);
        // console.log("remove list?", props.locationList);
    }

    function renderListItemCB(item) {
        // console.log("ITEM",item)
        return <div key={item.name}>{item.name}
                    <button onClick={() => removeFromTripACB(item.name)}>
                        X
                    </button>
                </div>
    }

    function saveTripACB(name) {
        // console.log("NAME of TO ADD", name)
        props.confirmTrip({name: name, locations: props.locationList});
        setVisisble(false);
    }

    function openModal() {
        setVisisble(true);
    }

    function closeModal() {
        setVisisble(false);
    }
    
    return(
        <div className="new-trip-view">
          <div>
            <SearchBar 
                selectPlace={selectPlace}
                data={data}
                status={status}
                setValue={setValue}
                ready={ready}
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
                  {props.locationList.map(renderListItemCB)}
              </ul>
          </div>
          <button onClick={openModal}>
            Save Trip!
          </button>
          {visible && <SaveTripPopup confirm={saveTripACB} cancel={closeModal}/>}
        </div>
    );
}

export default NewTripView;