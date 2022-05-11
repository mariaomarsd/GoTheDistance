import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig.js";
import { BrowserRouter } from 'react-router-dom';

const TripsModel = require("./tripsModel").default;
const tripsModel= new TripsModel();

// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

initializeApp(firebaseConfig);

const {updateFirebaseFromModel, updateModelFromFirebase}=require("./firebaseModel.js");

function ReactRoot() {
  // const [model, setModel] = useState();
  
  useEffect(function onStartACB() {
    updateModelFromFirebase(tripsModel, localStorage.getItem('userId'));
    updateFirebaseFromModel(tripsModel)
  }, [])

  return (
    <BrowserRouter>
      <App model={tripsModel}/>
    </BrowserRouter>
  );
}

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <ReactRoot/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
