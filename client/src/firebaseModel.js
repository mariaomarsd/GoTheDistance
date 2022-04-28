import firebase from "firebase/compat/app";
import "firebase/compat/database";
import firebaseConfig from "./firebaseConfig.js";

firebase.initializeApp(firebaseConfig);  

const REF = "gothedistance"

function updateFirebaseFromModel(model) {
    function observerACB(payload) {
        // console.log("PAYLOAD", payload.locationToAdd)
        // console.log("MODEL", model.newTripsLocationList)
        
        // if(payload.locationToAdd) {
        //     firebase.database().ref(REF+"/newTripsLocationList/"+payload.locationToAdd.name).set(payload.locationToAdd.name);
        // }
    }
    console.log("MODEL", model)
    model.addObserver(observerACB);
}

function updataModelFromFirebase(model) {
    
}

export {updateFirebaseFromModel, updataModelFromFirebase}