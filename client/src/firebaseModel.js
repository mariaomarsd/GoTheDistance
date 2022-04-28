import firebase from "firebase/compat/app";
import "firebase/compat/database";
import firebaseConfig from "./firebaseConfig.js";

firebase.initializeApp(firebaseConfig);  

const REF = "gothedistance"

function updateFirebaseFromModel(model) {
    function observerACB(payload) {
        console.log("PAYLOAD", payload.newTripsLocationList)
        console.log("MODEL", model.newTripsLocationList)
        if(payload.newTripsLocationList && payload.newTripsLocationList !== model.newTripsLocationList) {
            firebase.database().ref(REF+"/newTripsLocationList").set(payload.newTripsLocationList);
        }
    }
    console.log("MODEL", model)
    model.addObserver(observerACB);
}

function updataModelFromFirebase(model) {
    
}

export {updateFirebaseFromModel, updataModelFromFirebase}