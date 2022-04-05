import React, {useState} from 'react';
import SidebarViewMenu from './sidebarViewMenu';
import NewTripView from './newTripView';
import MyTripsView from './myTripsView';

function SidebarView(props){

    const sidebarMenuItems = [
        {
            title: "NEW TRIP",
            content: <NewTripView></NewTripView>,
            isVisable: false

        },
        {
            title: "MY TRIPS",
            content: <MyTripsView></MyTripsView>,
            isVisable: false

        },
        {
            title: "STATISTICS",
            content: <div>Book a new trip placeholder</div>,
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
                <SidebarViewMenu title={title} content={content} />
            ))}
      </div>
    </div>
  );
}

export default SidebarView;