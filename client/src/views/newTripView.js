import React, { useState } from 'react';
import { CloseOutlined, ArrowDownOutlined } from '@ant-design/icons';
import newTripView from '../styles/newTripView.css';

function NewTripView() {
    const [places, setPlaces] = useState([]);

    function saveLocation() {
        const item = document.getElementById("place-to-add").value;
        console.log(item);
        setPlaces([...places, item]);
    }

    function removeLocation(item) {
        function sameNameCB(place) {
            return item != place;
        }
        var temp = places;
        temp = temp.filter(sameNameCB);
        setPlaces(temp)
    }

  return ( 
     <div className="new-trip-view">
        <div className="search-place">
            <input placeholder="Search a place!" id="place-to-add" />
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