
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
        this.notifyObservers();
    }

    emptyNewList() {
        this.newList = [];
    }

    updateLocationList(trip, dist) {
        var ind = this.myTripsList.indexOf(trip);
        this.myTripsList[ind].locations = this.newList;
        this.myTripsList[ind].distanceNewTrip = dist;
        this.newList = [];
        this.notifyObservers({tripToAdd: trip, uid: localStorage.getItem('userId')});
    }

    /* Remove location from the new trip list in the model */
    removeFromNewTrip(id) {
        function hasSameIdCB(item) {
            return id !== item.id; // change later 
        }
        if(this.newTripsLocationList.length === 1) {
            this.newTripsLocationList =  [];
        }
        else {
            this.newTripsLocationList = this.newTripsLocationList.filter(hasSameIdCB);

        }
        this.notifyObservers();
    }

    removeFromEditList(id) {
        function hasSameIdCB(item) {
            return id !== item.id; // change later 
        }
        this.newList = this.newList.filter(hasSameIdCB);
        this.notifyObservers();
    }


    newOrder(item) {
        this.newTripsLocationList = item;
    }

    newOrderEditList(item) {
        this.newList  = item;
    }

    /* Safe current trip to users trips  */
    saveTrip(item) {
        this.myTripsList = [...this.myTripsList, item];
        this.newTripsLocationList = [];
        this.notifyObservers({tripToAdd: item, uid: localStorage.getItem('userId')});
    }

    setMyTripsList(list) {
        this.myTripsList = list
        this.notifyObservers();
    }

    removeAllTrips(){
        this.myTripsList = [];
        this.notifyObservers();
    }

    setVisableTrips(id) {
        this.myTripsList[id].show = !this.myTripsList[id].show;
        this.notifyObservers();
    }

    deleteMyTrip(trip) {
        function hasSameIdCB(item) {
            return trip.name !== item.name;
        }
        this.myTripsList = this.myTripsList.filter(hasSameIdCB);
        this.notifyObservers({tripToDelete: trip, uid: localStorage.getItem('userId')});
    }

    saveUserInfo(item) {
        localStorage.setItem('loggedin', item.loggedin);
        localStorage.setItem('username', item.username);
        localStorage.setItem('userId', item.userId);
        localStorage.setItem('firstSignin', item.firstSignin);
    }

    getUser() {
        return {
            loggedin: localStorage.getItem('loggedin'),
            firstSignin: localStorage.getItem('firstSignin'),
            username: localStorage.getItem('username'),
            userId: localStorage.getItem('userId')
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

    logout(){
        this.myTripsList = [];
        this.newTripsLocationList = [];
        this.newList = [];
        localStorage.clear()
        this.notifyObservers();
    }
}

export default TripsModel;