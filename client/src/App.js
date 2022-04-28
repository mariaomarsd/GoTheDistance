import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './styles/base.css'
import './styles/sidebarMenu.css'
import './styles/statisticsView.css'
import "@reach/combobox/styles.css";

const Presenter = require("./views/mainView.js").default;


export default function App(props) {
  return (
    <div className="app">
      {/* <BrowserRouter> */}
        <Routes>
          <Route exact path="/" element={<Presenter model={props.model} />} />
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}





