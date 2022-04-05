import React, {useState} from 'react';
import SidebarViewMenu from './sidebarViewMenu';
import NewTripView from './newTripView';

function SidebarView(props){

    const sidebarMenuItems = [
        {
            title: "NEW TRIP",
            content: <NewTripView></NewTripView>

        },
        {
            title: "MY TRIPS",
            content: <div>Book a new trip placeholder</div>

        },
        {
            title: "STATISTICS",
            content: <div>Book a new trip placeholder</div>

        },
        {
            title: "PROFILE",
            content: <div>Book a new trip placeholder</div>

        }
    ];

    return (
        <div className="test">
        <div className="sidebarView">
            {sidebarMenuItems.map(({ title, content }) => (
                <SidebarViewMenu title={title} content={content} />
            ))}
      </div>
    </div>
  );
}

export default SidebarView;