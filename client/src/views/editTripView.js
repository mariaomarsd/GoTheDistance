import React, { Children, useEffect, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { motion, Reorder } from "framer-motion";
import SearchBar from "../components/searchbarComponent.js";

function EditNewTripView(props){
    useEffect(listChangedCB, [props.locationList]);
    const [chosen, setChosen] = useState();
    const [items, setItems] = useState(props.locationList);
    const [temp, setTemp] = useState()
    // const [visible, setVisisble] = useState(false);
    // const [confirmVisible, setConfirmVisible] = useState(false);

    const {
        ready, // is it set up and redy to go with libraries, see above  in app function
        value, // what is the current value that user is writing
        suggestions: { status, data }, // what is the data from these suggestions
        setValue 
    } = usePlacesAutocomplete();

    async function selectPlace(address) {
        try {
            setTemp(false)
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            const temp_results = (results[0].formatted_address).split(',')
            const temp_place = temp_results[0] + ", " + temp_results.pop()
            setChosen({id: Math.random(),name: temp_place, lat: lat, lng: lng})
            onInputChangeACB()

        } catch (error) {
            console.log(" Error: ", error);
        }
    }

    function listChangedCB(){
        setItems(props.locationList)
    }

    function addToTripACB() {
        if(chosen === undefined) {
        }
        else {
            props.addToTrip(chosen);
        }
    }

    function removeFromTripACB(id) {
        props.removeFromTrip(id);
    }

    function saveTripACB() {
        props.confirmTrip({locations: items, show: true, color: ""});
    }

    function updateOrdertest() {
        props.updateOrder(items)
    }
    
    function cancelCB(){
        props.cancel();
    }

    function onInputChangeACB(event){
        document.addEventListener("keydown", function(event) {
            if(event.code === "Enter") { 
                event.preventDefault();
            }
        })

    }
    
    return(
        <div className="edit-trip-view"
            // initial={{ height: 0 }} 
            // animate={{ height: 200 }}
            // onChange={onInputChangeACB} 
            >
          <div className="search-component" /*onChange={onInputChangeACB}*/ /*id="search-input"*/ >
            <SearchBar 
                selectPlace={selectPlace}
                data={data}
                status={status}
                setValue={setValue}
                ready={ready}
            />
            <button className="new-trip-button" id="add" onClick={addToTripACB}>
                Add
            </button>
          </div>
            <div className="scroll">
              {/* Start location */}
              <Reorder.Group className="new-trips-item-list" values={items} onReorder={setItems}>
                  {
                    items.map((item,index) => {
                        updateOrdertest()
                    return <Reorder.Item className="new-trip-item" key={index} value={item} >
                    <button className="new-trip-item-button" onClick={() => removeFromTripACB(item.id)}>
                        X
                    </button>
                    <div className="new-trip-item-name">
                        {item.name}
                    </div>
                    {/* {item.name} */}
                             </Reorder.Item>
                    })
                  }
              </Reorder.Group>
              {/* End location */}
            </div>
            <div className="new-trip-button-container">
            <button className="new-trip-button" id="close" onClick={cancelCB}>
                Cancel
            </button>
            <button className="new-trip-button" id="save" onClick={saveTripACB}>
                Save Trip
            </button>
            </div>
        </div>
    );
}

export default EditNewTripView;