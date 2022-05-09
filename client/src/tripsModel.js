import resolvePromise from "./resolvePromise.js";

class TripsModel {
    constructor(newTripsLocationList = [], myTripsList = []) {
        this.newTripsLocationList = newTripsLocationList;
        this.myTripsList = myTripsList;
        this.observers = []; 
    }

    /* Safe location to new trips list in the model (not safe to the database) */
    addToNewTrip(item) {
        this.newTripsLocationList = [...this.newTripsLocationList, item];
        this.notifyObservers();
    }

    /* Remove location from the new trip list in the model */
    removeFromNewTrip(id) {
        function hasSameIdCB(item) {
            return id !== item.name; // change later 
        }
        this.newTripsLocationList = this.newTripsLocationList.filter(hasSameIdCB);
        this.notifyObservers();
    }

    newOrder(item) {
        this.newTripsLocationList = item;
        console.log("NEW LIST", this.newTripsLocationList)
        // this.notifyObservers();
    }

    /* Safe current trip to users trips  */
    saveTrip(item) {
        this.myTripsList = [...this.myTripsList, item];
        this.newTripsLocationList = []
        // console.log("Current My item: ", item);
        this.notifyObservers({tripToAdd: item});
    }

    setMyTripsList(list) {
        this.myTripsList = list
        // console.log("CURENT LIST FROM MODEL ", this.myTripsList);
        this.notifyObservers();
    }

    setVisableTrips(id) {
        this.myTripsList[id].show = !this.myTripsList[id].show;
        console.log('IS ID VISIBLE ', this.myTripsList[id].show)
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