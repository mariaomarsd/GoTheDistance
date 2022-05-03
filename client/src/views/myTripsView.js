import React, { useEffect, useState } from "react";
import { Checkbox } from 'antd';

function MyTripsView(props) {

    useEffect(listChangedCB ,[props.myTripsList])

    const [visableList, setVisibleList] = useState([props.myTripsList])
    // const [allMyTrips, setAllMyTrips] = useState([props.myTripsList])

    function listChangedCB(){
        console.log("EFTIR ÞETTA",props.myTripsList);
        getVisibleList();
    }

    function click(id) {
        // console.log(`checked = ${e.target.checked}`);
        console.log('ONCLICK', id)
        // console.log('my.list', props.myTripsList)
        var temp = props.myTripsList.indexOf(id, 0)
        props.setVisibleTrips(temp);
        // console.log('SET VISIBLE', id)
        getVisibleList()
    }

    function renderItemsCB(item) {
        // console.log("item GERIST NUNA")
        return <div className="my-trips-item" key={item.name} >
                    {/* <input 
                        className="my-trips-item-check"
                        type="checkbox"
                        // checked={item.show}
                    ></input> */}
                    <div onClick={() => click(item)}> 
                        <Checkbox checked={item.show} />
                        <div className="my-trips-item-name">
                            {item.name}
                        </div>
                    </div>
                </div>
    }

    function getVisibleList() {
        var tempList = [];
        for(let i = 0; i<props.myTripsList.length; i++) {
            tempList.push(props.myTripsList[i].show)
            // console.log("NOW", props.myTripsList[i].show)
            // if(props.myTripsList[i].show){
                // var tempVar = props.myTripsList[i].show
                // tempList.push(props.myTripsList[i].show)
                // console.log("NAME", props.myTripsList[i].name)
            // }
        }
        // console.log("TEMOP LIST", tempList)
        // props.setVisibleTrips(0);
        setVisibleList(tempList)
    }

    function changeVisability(id) {
        // console.log('TO CHECK', id)
        // props.setVisibleTrips(0);
        // getVisibleList()
    }
    
    return(
        <div className="my-trips-view">
            {props.myTripsList.length === 0 ? <div>You have no trips</div> :
            <ul className="my-trips-item-list">
                {props.myTripsList.map(renderItemsCB)}
            </ul>}
        </div>
    );
}

export default MyTripsView;