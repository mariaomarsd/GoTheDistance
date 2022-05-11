import React, { useEffect, useState } from "react";
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
            setChosen({name: temp_place, lat: lat, lng: lng})

        } catch (error) {
            console.log(" Error: ", error);
        }
        // console.log("items", items)
    }

    function listChangedCB(){
        // console.log("NUNA");
        setItems(props.locationList)
        // console.log(" OG SVO NUNA", items);
    }

    function addToTripACB() {
        // console.log("first", items)

        props.addToTrip(chosen);
        console.log("tets", selectPlace)
        setTemp(true)
        console.log("tets", temp)
        // console.log("now", items)
        // props.addToTrip(items)
    }

    // id is name temp
    function removeFromTripACB(id) {
        props.removeFromTrip(id);
        // console.log("remove list?", props.locationList);
    }

    function renderListItemCB(item) {
        // console.log("eitt item", items)
        // props.updateOrder(items)
        updateOrdertest()
        return <Reorder.Item className="new-trip-item" key={item.name} value={item} >
                    <button className="new-trip-item-button" onClick={() => removeFromTripACB(item.name)}>
                        X
                    </button>
                    <div className="new-trip-item-name">
                        {item.name}
                    </div>
                    {/* {item.name} */}
                </Reorder.Item>
    }

    function saveTripACB() {
        // console.log('SAVED', items)
        props.confirmTrip({locations: items, show: true, color: ""});
        //setVisisble(false);
    }

    function updateOrdertest() {
        // console.log('NOW', items)
        props.updateOrder(items)
    }
    
    return(
        <div className="new-trip-view"
            // initial={{ height: 0 }} 
            // animate={{ height: 200 }}
            >
          <div className="search-component">
            <SearchBar 
                selectPlace={selectPlace}
                data={data}
                status={status}
                setValue={setValue}
                // setVal={setVal}
                ready={ready}
                // val={temp}
            />
            <button className="new-trip-button" id="add" onClick={addToTripACB}>
                Add
            </button>
          </div>
          <div>
              {/* Start location */}
              <Reorder.Group className="new-trips-item-list" values={items} onReorder={setItems}>
                  {items.map(renderListItemCB)}
              </Reorder.Group>
              {/* End location */}
          </div>
          <button className="new-trip-button" id="save" onClick={saveTripACB}>
            Save Trip
          </button>
        </div>
    );
}

export default EditNewTripView;