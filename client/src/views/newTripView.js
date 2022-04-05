import React, { useState } from 'react';
import { CloseOutlined, ArrowDownOutlined, RestFilled } from '@ant-design/icons';
import newTripView from '../styles/newTripView.css';
import SearchBar from './searchBarView';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  
  ///*
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
    // const test = "";

    function saveLocation() {
        console.log(choosePlace);
        // const item = document.getElementById("place-to-add").value;
        // console.log("ITEM",item);
        setPlaces([...places, choosePlace]);
    }

    function removeLocation(item) {
        function sameNameCB(place) {
            return item != place;
        }
        var temp = places;
        temp = temp.filter(sameNameCB);
        setPlaces(temp)
    }

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

    async function selectPlace(address) {
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            console.log({ lat, lng });
            // console.log("RESULTS", results[0].formatted_address)
            setChoosePlace(results[0].formatted_address);
            // console.log("SAME", choosePlace)
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
            <div className="Search">
                <Combobox onSelect={selectPlace} >
                    <ComboboxInput
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={!ready}
                        placeholder="Search your location"
                    />
                    <ComboboxPopover>
                        {status === "OK" &&
                            data.map(({ id, description, }) => (
                                <ComboboxOption key={id} value={description} />
                        ))}
                    </ComboboxPopover>
                </Combobox>
            </div>
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