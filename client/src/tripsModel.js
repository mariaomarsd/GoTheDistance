class TripsModel {
    constructor(newTripsLocationList = [], myTripsList = []) {
        this.newTripsLocationList = newTripsLocationList;
        this.myTripsList = myTripsList;
        this.observers = []; 
    }

    addToNewTrip(item) {
        console.log( "Hér", item); 
        this.newTripsLocationList = [...this.newTripsLocationList, item];
        this.notifyObservers();
        console.log(this.newTripsLocationList);

        //this.newTripsLocationList = item;
    }

    removeFromNewTrip(id) {
        function hasSameIdCB(item) {
            return id !== item.id;
        }
        this.newTripsLocationList.filter(hasSameIdCB);
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