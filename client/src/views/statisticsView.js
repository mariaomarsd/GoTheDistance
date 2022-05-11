import React from "react";
import Counter from "../components/counter.js"

function StatisticsView(props) {
    function renderPlacesCB(name) {
        return  <div className="my-trips-item" key={name}>
                    <div className="my-trips-item-name">
                        {name}
                    </div>
                </div>     
    }

    function renderCountriesCB(name) {
        return  <div className="my-trips-item" key={name}>
                    <div className="my-trips-item-name">
                        {name}
                    </div>
                </div>  
    }

    return(
        <div className="statistic-view">
            <div className="statistic-wrapper">
                <div className="statistic-title">
                    Distance Travelled
                </div>
                {props.myTripsList.length === 0 ? <div>0.0 km</div> :
                <div className="statistic-number">
                    <Counter from={0} to={props.totalDistance}/> <div>km</div>
                </div>}
            </div>
            <div className="statistic-wrapper">
                <div className="statistic-title">
                    Places Visited
                </div>
                {props.myTripsList.length === 0 ? <div>0</div> :
                <div className="statistic-number">
                   <Counter from={0} to={props.numberOfPlaces} />
                </div>}
            </div>
            <div className="statistic-wrapper">
                <div className="statistic-title">
                    List of Places
                </div>
                {props.myTripsList.length === 0 ? <div>none</div> :
                <div className="statistic-number">
                     {props.ListOfPlaces.map(renderPlacesCB)}
                </div>}
            </div>
            <div className="statistic-wrapper">
                <div className="statistic-title">
                    Countries Visited
                </div>
                {props.myTripsList.length === 0 ? <div>0</div> :
                <div className="statistic-number">
                    <Counter from={0} to={props.numberOfCountries} />
                </div>}
            </div>
            <div className="statistic-wrapper">
                <div className="statistic-title">
                    List of Countries
                </div>
                {props.myTripsList.length === 0 ? <div>none</div> :
                <div className="statistic-number">
                    {props.ListOfCountries.map(renderCountriesCB)}
                </div>}
            </div>
        </div>
    );
}

export default StatisticsView;