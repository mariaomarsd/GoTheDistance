//import React from "react";
import React, { Component } from "react";

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

import "@reach/combobox/styles.css";


function SearchBar() {
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

  return (
    <div className="Search">
      <Combobox 
        onSelect={async (address)=> {
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            console.log({ lat, lng });
          } catch (error) {
            //console.log(" Error: ", error);
          }
          console.log(address);
        }}>
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
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
  );
}

export default SearchBar;