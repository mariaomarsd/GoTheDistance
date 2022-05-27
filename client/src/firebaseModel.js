import firebase from "firebase/compat/app";
import "firebase/compat/database";
import firebaseConfig from "./firebaseConfig.js";

// import TripsModel from "./tripsModel.js";

firebase.initializeApp(firebaseConfig);  

const REF = "gothedistance"

function updateFirebaseFromModel(model) {
    
    function observerACB(payload) {
        if(payload && payload.tripToAdd) {
            firebase.database().ref(REF+"/"+payload.uid+"/userTrips/"+payload.tripToAdd.name).set(payload.tripToAdd);
        }
        if(payload && payload.tripToDelete) {
            firebase.database().ref(REF+"/"+payload.uid+"/userTrips/"+payload.tripToDelete.name).set(null);
        }
    }
    model.addObserver(observerACB);
}

function updateModelFromFirebase(model, uid) {
    if (uid == null) {
        model.removeAllTrips();
    }
    else {
        firebase.database().ref(REF+"/"+uid+"/userTrips").on("value", firebaseData => {
            function updateModelCB(trip) {
                function checkIfInModelCB(tripInModel) {
                    if (tripInModel.name === trip.name){
                        alreadyInModel = true;
                    }
                }
                var alreadyInModel = false;
                model.myTripsList.map(checkIfInModelCB)
                if(!alreadyInModel) {        
                    model.saveTrip(trip);
                }
            }
            if(firebaseData.val()) {
                const tripList = Object.values(firebaseData.val());
                tripList.map(updateModelCB); 
            }
        });
    }
    
}

export {updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise}