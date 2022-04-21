import React, {useState} from 'react';
import SidebarViewMenu from './sidebarViewMenu';
import NewTripView from './newTripView';
import MyTripsView from './myTripsView';
import StatisticsView from './statisticsView';

function SidebarView(props){

    const sidebarMenuItems = [
        {
            title: "NEW TRIP",
            content: <NewTripView setLocation={props.setLocation}></NewTripView>,
            isVisable: false,
            id: "new"

        },
        {
            title: "MY TRIPS",
            content: <MyTripsView></MyTripsView>,
            isVisable: false,
            id: "my"

        },
        {
            title: "STATISTICS",
            content: <StatisticsView></StatisticsView>,
            isVisable: false,
            id: "stat"

        },
        {
            title: "PROFILE",
            content: <div>Book a new trip placeholder</div>,
            isVisable: false,
            id: "prof"

        }
    ];

    return (
        <div>
        <div className="sidebarView">
            {sidebarMenuItems.map(({ title, content, id }) => (
                <SidebarViewMenu title={title} content={content} key={title} id={id}/>
            ))}
      </div>
    </div>
  );
}

export default SidebarView;