import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './styles/base.css'
import './styles/sidebarMenu.css'
import './styles/statisticsView.css'


//tjekka hvort virki, breyta svo í presenter
const Map = require("./views/mapView.js").default;
const NewTrip = require("./views/newTripView.js").default;
const Sidebar = require("./views/sidebarView.js").default;
const Presenter = require("./presenters/mainPresenter").default;

export default function App() {
  return (
    <div className="app">
      {/* <div className="map-sidebar">
        <div className="map-container">
          <Map></Map>
        </div>
        <div className="sidebar-container">
          <Sidebar></Sidebar>
        </div>
      </div> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Presenter/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


