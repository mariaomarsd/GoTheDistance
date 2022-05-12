import React, { useEffect, useState, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, Polyline, Marker } from "@react-google-maps/api";
import mapStyles from "../mapStyles";
import mapStylesBlack from "../mapStylesBlack";
import { motion } from "framer-motion";


const center = { // where to start the map, stockholm
    lat: 23.818858,
    lng: 6.094477,
};

const options = {
    backgroundColor: "light blue",
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    minZoom: 3,
    maxZoom: 6,
};
  
const mapContainerStyle = {
    height: "100vh",
};

const pathOptions = {
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 4
  };

function MapPresenter(props){

    // localStorage.getItem('token')
    useEffect(observerCB, []);

    const mapRef = useRef(); // part of move mapview to chosen destination

    const onMapLoad = useCallback((map) => { // part of move mapview to chosen destination
        mapRef.current = map; // part of move mapview to chosen destination
    }, []);

    const [newTripPathList, setNewTripPathList] = useState([]);
    const [myTripsPathList, setMyTripsPathList] = useState([]);

    function observerCB(){
        props.model.addObserver(getCurrentPathCB);
        function componentDiesCB() {
            props.model.removeObserver(getCurrentPathCB);
        }
        // called when the component is taken down
        return componentDiesCB;
    }

    function getMyTripsPathListCB() {
        if(props.model.myTripsList == 0) {
            setMyTripsPathList([]);
            return;
        }
        var myList = JSON.parse(JSON.stringify(props.model.myTripsList));
        var temp = []
        var temp_color = []
        var temp_show = []
        var temp_name = []
        myList.forEach(item => {
            temp_color.push(item.color)
            temp_show.push(item.show)
            temp_name.push(item.name)
        });
        for(var i = 0; i<myList.length; i++) {
            var latLng = [[],[],[]];
            myList[i].locations.forEach(item => {
                delete item['name'];
                latLng[0].push({lat: item["lat"], lng: item["lng"]})
            });
            latLng[1] = temp_color[i]
            latLng[2] = temp_show[i]
            latLng[3] = temp_name[i]
            temp.push(latLng)
        }
        setMyTripsPathList(temp);
        
    }

    function getCurrentPathCB() {
        var tempPathList = JSON.parse(JSON.stringify(props.model.newTripsLocationList));
        tempPathList.forEach(item => {
            delete item['name'];
        });
        setNewTripPathList(tempPathList);
        getMyTripsPathListCB();
        // if(props.model.myTripsList.length !== 0) {
        //     getMyTripsPathListCB();
        // }
    }

    function renderPolyline(trip) {
        const myTripsPathOptions = {
            geodesic: true,
            strokeColor: trip[1],
            strokeOpacity: 1.0,
            strokeWeight: 4
        };
        if(trip[2] === false) {
            return
        }
        return <div key={trip[1]}>
                <Polyline path={trip[0]} options={myTripsPathOptions}/>
                <Marker
                    position={trip[0][0]}
                    // icon={{url:  "/BlackAndWhite-marker.png"}}
                    label={trip[3]}
                />
                </div> 
    }

    function moveViewinMap(locationList){
       try{
         mapRef.current.panTo(locationList.at(-1));
       }catch(error){}
    }

    function ChangeMapStiles(){
        return (
            <motion.div className="CangeMapLook"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }} >
                 <button className="map-button" onClick={rotateMapStiles} value="White" id="CangeMapLookToggleButton">
                    Change map style
                    <span className="logo-icon">
                        <i className="fa-solid fa-earth-americas"></i>
                    </span>
                </button>
            </motion.div>
        ) 
    }
    function rotateMapStiles(){
        var button = document.getElementById("CangeMapLookToggleButton");
        
        const optionsBlack = {
            backgroundColor: "light blue",
            styles: mapStylesBlack,
            disableDefaultUI: true,
            zoomControl: true,
            minZoom: 3,
            maxZoom: 6,
        };

        if(button.value === "Black" ){
            mapRef.current.setOptions(options);
            button.value = "White";
            
        }
        else if(button.value === "White" ){
            mapRef.current.setOptions(optionsBlack);
            button.value = "Black";
        } 
    }

    return(
          <div>
              <ChangeMapStiles />
              {props.value && <GoogleMap id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={3}
                center={center}
                options={options}
                onLoad={onMapLoad}>
                {/* Draw polyline for the new trip that is created */}
                <Polyline
                    path={newTripPathList}
                    options={pathOptions}
                /> 
                {/* <FontAwesomeIcon icon="fa-solid fa-location-pin" /> */}
                {/* Draw polyline for all trips that are in my trips */}
                {myTripsPathList.map(renderPolyline)}
                {/* Draw markers for the new trip that is created */}
                { newTripPathList.map((item, index) => {                      
                        return (
                        <Marker key= {(index+1).toString()}
                            position = {item}
                            icon = {{ url: "/BlackAndWhite-marker.png" }}
                            label = {(index+1).toString()}
                    /> );
                    
                })}
                {/*center the map view on the place most recently chosen*/
                moveViewinMap(newTripPathList)}
                
                </GoogleMap>
                }{<ChangeMapStiles/>}
                
          </div>
      );
}



export default MapPresenter;