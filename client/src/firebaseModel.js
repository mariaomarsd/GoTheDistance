import firebase from "firebase/compat/app";
import "firebase/compat/database";
import firebaseConfig from "./firebaseConfig.js";

// import TripsModel from "./tripsModel.js";

firebase.initializeApp(firebaseConfig);  

const REF = "gothedistance"

function updateFirebaseFromModel(model) {
    function observerACB(payload) {
        // console.log("PAYLOAD", payload)
        if(payload && payload.tripToAdd) {
            // userID = 1 now
            firebase.database().ref(REF+"/userTrips/"+"1").set(payload.tripToAdd);
        }
    }
    model.addObserver(observerACB);
}

function updataModelFromFirebase(model) {
    // userID = 1 now
    firebase.database().ref(REF+"/UserTrips/"+"1").on("value",
        function myTripsChangedInModel(firebaseData){
            // console.log('FOR HER')
            model.setMyTripsList(firebaseData.val());
        });

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

export {updateFirebaseFromModel, updataModelFromFirebase, firebaseModelPromise}