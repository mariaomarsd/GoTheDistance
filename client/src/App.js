import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

//tjekka hvort virki, breyta svo í presenter
const Map = require("./views/mapView.js").default;
const NewTrip = require("./views/newTripView.js").default;

export default function App() {
  return (
    <div class="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Map/>} />
          <Route exact path="/" element={<NewTrip/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


