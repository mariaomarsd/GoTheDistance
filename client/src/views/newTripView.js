import React from 'react';

function newTripView(props){

    return(
        <div class="new-trip-view">
            <div class="search-place">
                <input placeholder="Search a place!" />
                <button > Add to trip </button>
            </div>
        </div>
    );
}

export default newTripView;