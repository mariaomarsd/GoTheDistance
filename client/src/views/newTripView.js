import React, { useState } from 'react';
import { CloseOutlined, ArrowDownOutlined, RestFilled } from '@ant-design/icons';
import '../styles/newTripView.css';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";

import { // just for box looks
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

function NewTripView() {

    const [places, setPlaces] = useState([]);
    const [choosePlace, setChoosePlace] = useState("");

    const {
        ready, // is it set up and redy to go with libraries, see above  in app function
        value, // what is the current value that user is writing
        suggestions: { status, data }, // what is the data from these suggestions
        setValue, 
        clearSuggestions,
        } = usePlacesAutocomplete({
        requestOptions: { // preffer places that are near this location 
        
        },
    });

    // Save location that is added to trip
    function saveLocation() {
        console.log(choosePlace);
        // const item = document.getElementById("place-to-add").value;
        setPlaces([...places, choosePlace]);
    }

    // Remove location that is deleted from trip
    function removeLocation(item) {
        function sameNameCB(place) {
            return item != place;
        }
        var temp = places;
        temp = temp.filter(sameNameCB);
        setPlaces(temp)
    }

    async function selectPlace(address) {
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            const temp_results = (results[0].formatted_address).split(',')
            const temp_place = temp_results[0] + ", " + temp_results.pop()
            // console.log("TEMP_resutls", temp_place);
            setChoosePlace(temp_place);
            console.log([lat, lng])
        } catch (error) {
            //console.log(" Error: ", error);
        }
        // console.log("ADDRESS", results);
    }

  return ( 
     <div className="new-trip-view">
        <div className="search-place">
            {/* <input placeholder="Search a place!" id="place-to-add" /> */}
            {/* <SearchBar id="place-to-add"/> */}
            <Combobox onSelect={selectPlace} >
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    placeholder="Search a place!"
                />
                <ComboboxPopover>
                    {status === "OK" &&
                        data.map(({ place_id, description, }) => ( 
                            <ComboboxOption key={place_id} value={description} />
                    ))}
                </ComboboxPopover>
            </Combobox>
            <button onClick={saveLocation} > Add to trip! </button>
        </div>
        <div className="current-places">
            <p> Current Trip: </p>
            <ul>
                {places.map(item => 
                <div key={item} className="current-places-list">
                    <div className="current-places-box">
                        <button className="current-places-x" onClick={() => removeLocation(item)}>
                            <CloseOutlined />
                        </button>
                        <div className="current-places-name">
                            {item}
                        </div>
                        <div className="current-places-arrow">
                            <ArrowDownOutlined /> 
                        </div>
                    </div>
                </div>
                )}
            </ul>
        </div>
    </div>
  );
}

export default NewTripView;