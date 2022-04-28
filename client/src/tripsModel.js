class TripsModel {
    constructor(newTripsLocationList = [], myTripsList = []) {
        this.newTripsLocationList = newTripsLocationList;
        this.myTripsList = myTripsList;
        this.observers = []; 
    }

    addToNewTrip(item) {
        this.newTripsLocationList = [...this.newTripsLocationList, item];
        this.notifyObservers();
        console.log("Current list: ", this.newTripsLocationList);

        //this.newTripsLocationList = item;
    }

    removeFromNewTrip(id) {
        console.log("what are you", id);
        function hasSameIdCB(item) {
            return id !== item.name; // change later 
        }
        this.newTripsLocationList = this.newTripsLocationList.filter(hasSameIdCB);
        console.log("status after filteR:", this.newTripsLocationList);
        this.notifyObservers();
    }

    saveTrip(item) {
        this.myTripsList = [...this.myTripsList, item];
    }

    setVisableTrips(id) {
        for (let i = 0; i < this.myTripsList.length; i++) {
           if(this.myTripsList[i].id === id) {
               this.myTripsList[i].show = !this.myTripsList[i].show;
           }
        }
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