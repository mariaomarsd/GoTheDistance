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
                console.log(Object.values(firebaseData.val()));
            }
        });
    }
    
}

function firebaseModelPromise() {
    // function makeBigPromiseACB(firebaseData) {
    //     function makeDishPromiseCB(dishId) {
    //         return getDishDetails(dishId);
    //     }
    //     function createModelACB(dishArray) {
    //         let myTripsList = firebaseData.val().myTripsList;
    //         return new TripsModel(myTripsList);
    //     }
    //     const tripsPromiseArray= Object.keys(firebaseData.val().Dishes).map(makeDishPromiseCB);
    //     return Promise.all(tripsPromiseArray).then(createModelACB);
    // }
    // return firebase.database().ref(REF).once("value").then(makeBigPromiseACB);
}

export {updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise}