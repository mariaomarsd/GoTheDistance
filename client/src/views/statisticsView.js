import {React, useState} from "react";
import Counter from "../components/counter.js"

function StatisticsView(props) {

    const[placesToggle, setPlacesToggle] =  useState(true);
    const[countriesToggle, setCountriesToggle] =  useState(true);
    const[kmToggle, setkmToggle] =  useState(true);
    
    function togglePlaces(){
        setPlacesToggle(!placesToggle);
    }

    function toggleCountries(){
        setCountriesToggle(!countriesToggle);
    }

    function toggleKm(){
        setkmToggle(!kmToggle);
    }

    function renderPlacesCB(name) {
        return  <div className="places" key={name}>
                    <div className="statistic-text">
                        {name}
                    </div>
                </div>     
    }

    function renderCountriesCB(name) {
        return  <div className="countries" key={name}>
                    <div className="statistic-text">
                        {name}
                    </div>
                </div>   
    }

    function renderDistanceCB(item) {
        return  <div className="Distance" key={item.name}>
                    <div className="statistic-text">
                        <b>{item.name}</b><span>: </span>
                        {item.distanceNewTrip.toFixed(2)}<span> km</span>
                    </div>
                </div>   
    }

    return(
        <div className="statistic-view">
            <div className="statistic-wrapper">
            <button className="display-button" onClick={toggleKm}>
                {kmToggle ? 
            <div>
                <div className="statistic-title">
                    Distance Travelled
                    </div>
                        <div className="number-of-places">
                             {props.myTripsList.length === 0 ? <div>0.0 km</div> :
                            <div className="statistic-km-number">
                                <Counter from={0} to={props.totalDistance}/> <span className="km">km</span>
                            </div>}
                            <u className="extra-text">See distribution</u> 
                        </div>
                        </div>
                        : 
                        <div> 
                            <div className="statistic-title">
                                Distance Travelled
                            </div>
                            <div className="list-of-places">
                                {props.myTripsList.length === 0 ? <div>none</div> :
                                <div className="statistic-text">
                                    <div className="scroll">
                                        {props.myTripsList.map(renderDistanceCB)}
                                    </div>
                                </div>}
                            <u className="extra-text">See total km</u> 
                            </div> 
                        </div> 
                        } 
                </button>
            </div>
                <div className="statistic-wrapper">
                    <button className="display-button" onClick={togglePlaces}>
                        {placesToggle ? 
                    <div>
                        <div className="statistic-title">
                            Places Visited
                        </div>
                        <div className="number-of-places">
                            {props.myTripsList.length === 0 ? <div>0</div> :
                            <div className="statistic-number">
                                    <Counter from={0} to={props.numberOfPlaces} />
                            </div>}
                            <u className="extra-text">See total list</u> 
                        </div>
                    </div>
                    : 
                    <div>
                    <div className="statistic-title">
                            Places Visited
                        </div>
                    <div className="list-of-places">
                        {props.myTripsList.length === 0 ? <div>none</div> :
                        <div className="statistic-text">
                            <div className="scroll">
                                {props.ListOfPlaces.map(renderPlacesCB)}
                            </div>
                        </div>}
                        <u className="extra-text">See total number</u> 
                    </div>
                    </div>
                    }
                </button>
            </div>
            <div className="statistic-wrapper">
                <button className="display-button" onClick={toggleCountries}>
                    {countriesToggle ? 
                <div>
                    <div className="statistic-title">
                        Countries Visited
                    </div>
                        <div className="number-of-places">
                            {props.myTripsList.length === 0 ? <div>0</div> :
                            <div className="statistic-number">
                                <Counter from={0} to={props.numberOfCountries} />
                            </div>}
                            <u className="extra-text">See total list</u> 
                        </div>
                    </div>
                    : 
                    <div>
                    <div className="statistic-title">
                        Countries Visited
                    </div>
                    <div className="list-of-places">
                        {props.myTripsList.length === 0 ? <div>none</div> :
                        <div className="statistic-text">
                            <div className="test">
                            <div className="scroll">
                                {props.ListOfCountries.map(renderCountriesCB)}
                            </div>
                            </div>
                        </div>}
                        <u className="extra-text">See total number</u> 
                    </div>
                    </div>
                    }
                </button>
            </div>
        </div>
    );
}

export default StatisticsView;