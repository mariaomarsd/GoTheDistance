import React, { Component, useState } from "react";

import {
  GoogleMap,
  useLoadScript,
  Polyline
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { // just for box looks
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
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

function MapView(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

const mapRef = React.useRef(); // part of move mapview to chosen destination
const onMapLoad = React.useCallback((map) => { // part of move mapview to chosen destination
    mapRef.current = map; // part of move mapview to chosen destination
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => { // part of move mapview to chosen destination
    mapRef.current.panTo({ lat, lng }); // moving the location to the formentioned coordiantes
    mapRef.current.setZoom(8); // how far zoomed in the view is 
  }, []);// part of move mapview to chosen destination

  const pathOptions = {
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 4
  };
  
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <Search panTo = {panTo}/>
      <GoogleMap id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}>
        <Polyline
          path={props.locationList}
          options={pathOptions}/>
      </GoogleMap>
    </div>
  );
}

// Additional search bar (Only temp!!)
function Search({ panTo }) {
  const {
    ready, // is it set up and redy to go with libraries, see above  in app function
    value, // what is the current value that user is writing
    suggestions: { status, data }, // what is the data from these suggestions
    setValue, 
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { 
      // preffer places that are near this location 
    },
  });
  
  return (
    <div className="Search">
      <Combobox 
        onSelect={async (address) => {
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng }); // send the user view to the chosen location
          } catch (error) {
            console.log(" Error: ", error);
          }
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
        {status === "OK" && data.map(({ id, description, }) => (
          <ComboboxOption key={id} value={description}/> ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default MapView;