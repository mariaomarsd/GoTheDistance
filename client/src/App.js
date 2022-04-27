import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './styles/base.css'
import './styles/sidebarMenu.css'
import './styles/statisticsView.css'
import "@reach/combobox/styles.css";

const Presenter = require("./views/mainView.js").default;
const TripsModel = require("./tripsModel.js").default;
const tripsModel= new TripsModel();

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Presenter model={tripsModel} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


