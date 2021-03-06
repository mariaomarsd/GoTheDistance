import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "@reach/combobox/styles.css";

import './styles/mainView.css';
import "./styles/sidebar.css";
import "./styles/newTrip.css";
import "./styles/myTrips.css";
import "./styles/statistics.css";
import "./styles/profile.css"

const MainPresenter = require("./presenters/mainPresenter.js").default;

export default function App(props) {
  return (
    <div className="app">
        <Routes>
          <Route exact path="/" element={<MainPresenter model={props.model} />} />
        </Routes>
    </div>
  );
}
