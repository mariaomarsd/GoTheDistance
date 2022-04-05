//import React from "react";
import React, { Component } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
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
//*/
import "@reach/combobox/styles.css";
//import { formatRelative } from "date-fns";

//import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "80vw",
};

const center = { // where to start the map, stockholm
  lat: 59.327607,
  lng: 18.064266,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <Search  />
      <GoogleMap id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        
      ></GoogleMap>
    </div>
  );
}
function Search() {
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

  // "onSelect={(adress)=>" refers to when option chosen from drop down
  // "onChange={(e) => { setValue(e.target.value);" refers to user input
  // " "

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