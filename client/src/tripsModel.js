// import resolvePromise from "./resolvePromise.js";
// import { ReactSession } from "react-client-session";

class TripsModel {
    constructor(newTripsLocationList = [], myTripsList = [], newList = []) {
        this.newTripsLocationList = newTripsLocationList;
        this.myTripsList = myTripsList;
        this.newList = newList;
        this.observers = [];
        this.sidebartoggle=[false, false, false];
    }

    toggleSidebar(toOpen){
        this.sidebartoggle[toOpen] = !this.sidebartoggle[toOpen];
        for(var i = 0; i<this.sidebartoggle.length; i++) {
            if(i !== toOpen) {
                this.sidebartoggle[i] = false;
            }
        }
        this.notifyObservers();
    }

    /* Safe location to new trips list in the model (not safe to the database) */
    addToNewTrip(item) {
        this.newTripsLocationList = [...this.newTripsLocationList, item];
        this.notifyObservers();
    }

    addToNewList(item){
        this.newList = [...this.newList, item];
        this.notifyObservers();
    }

    emptyLocationList(){
        this.newTripsLocationList = [];
        this.notifyObservers();
    }

    editTrip(trip) {
        this.newList = trip.locations;
        // this.newTripsLocationList  = trip.locations;
        this.notifyObservers();
    }

    updateLocationList(trip, dist) {
        var ind = this.myTripsList.indexOf(trip);
        this.myTripsList[ind].locations = this.newList;
        this.myTripsList[ind].distanceNewTrip = dist;
        this.newList = [];
        // this.myTripsList[ind].locations = this.newTripsLocationList;
        // this.newTripsLocationList = [];
        this.notifyObservers({tripToAdd: trip, uid: localStorage.getItem('userId')});
    }

    /* Remove location from the new trip list in the model */
    removeFromNewTrip(id) {
        function hasSameIdCB(item) {
            //console.log("removeFromNewTrip: "+ item.id + " id: "+ id )
            // console.log("item.id: "+item.id+" id: "+ id)
            //console.log(id)
            return id !== item.id; // change later 
        }
        this.newTripsLocationList = this.newTripsLocationList.filter(hasSameIdCB);
        this.notifyObservers();
    }

    newOrder(item) {
        this.newTripsLocationList = item;
        //console.log("NEW LIST", this.newTripsLocationList)
        // this.notifyObservers();
    }

    /* Safe current trip to users trips  */
    saveTrip(item) {
        this.myTripsList = [...this.myTripsList, item];
        this.newTripsLocationList = [];
        console.log("Can save ", localStorage.getItem('userId'));
        this.notifyObservers({tripToAdd: item, uid: localStorage.getItem('userId')});
    }

    setMyTripsList(list) {
        this.myTripsList = list
        // console.log("CURENT LIST FROM MODEL ", this.myTripsList);
        this.notifyObservers();
    }

    removeAllTrips(){
        this.myTripsList = [];
        this.notifyObservers();
    }

    setVisableTrips(id) {
        this.myTripsList[id].show = !this.myTripsList[id].show;
        // console.log('IS ID VISIBLE ', this.myTripsList[id].show);
        this.notifyObservers();
    }

    deleteMyTrip(trip) {
        function hasSameIdCB(item) {
            return trip.name !== item.name;
        }
        this.myTripsList = this.myTripsList.filter(hasSameIdCB);

        this.notifyObservers({tripToDelete: trip, uid: localStorage.getItem('userId')});
        // this.myTripsList = this.myTripsList;
    }

    addObserver(callback) {
        this.observers.push(callback);
    }

    removeObserver(callback) {
        function removeObserverCB(cb){
            if (cb === callback) {
                return false;
            }
            return true;
        }
        this.observers = this.observers.filter(removeObserverCB);
    }

    notifyObservers(payload) {
        try {
            this.observers.forEach(function invokeObserberCB(obs){obs(payload);})
        }
        catch(error) {
            console.log(error);
        }
    }
}

export default TripsModel;