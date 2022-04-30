import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "@reach/combobox/styles.css";

import './styles/mainView.css';
import "./styles/presenters.css";
import "./styles/sidebarView.css";
import "./styles/newTrip.css";
import "./styles/myTrips.css";

const MainView = require("./views/mainView.js").default;

export default function App(props) {
  return (
    <div className="app">
        <Routes>
          <Route exact path="/" element={<MainView model={props.model} />} />
        </Routes>
    </div>
  );
}





