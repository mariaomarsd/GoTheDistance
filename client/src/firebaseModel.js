import firebase from "firebase/compat/app";
import "firebase/compat/database";
import firebaseConfig from "./firebaseConfig.js";

firebase.initializeApp(firebaseConfig);  

const REF = "gothedistance"

function updateFirebaseFromModel(model) {
    function observerACB(payload) {
        console.log("PAYLOAD", payload)
        if(payload && payload.tripToAdd) {
            // userID = 1 now
            firebase.database().ref(REF+"/userTrips/"+"1").set(payload.tripToAdd);
        }
    }
    model.addObserver(observerACB);
}

function updataModelFromFirebase(model) {
    
}

export {updateFirebaseFromModel, updataModelFromFirebase}