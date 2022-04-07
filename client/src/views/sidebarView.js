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
            isVisable: false

        },
        {
            title: "MY TRIPS",
            content: <MyTripsView></MyTripsView>,
            isVisable: false

        },
        {
            title: "STATISTICS",
            content: <StatisticsView></StatisticsView>,
            isVisable: false

        },
        {
            title: "PROFILE",
            content: <div>Book a new trip placeholder</div>,
            isVisable: false

        }
    ];

    return (
        <div>
        <div className="sidebarView">
            {sidebarMenuItems.map(({ title, content, isVisable }) => (
                <SidebarViewMenu title={title} content={content} key={title} />
            ))}
      </div>
    </div>
  );
}

export default SidebarView;