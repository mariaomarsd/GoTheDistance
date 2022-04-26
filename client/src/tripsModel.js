class TripsModel {
    constructor(newTripsLocationList = [], myTripsList = []) {
        this.newTripsLocationList = newTripsLocationList;
        this.myTripsList = myTripsList; 
    }

    addToNewTrip(item) {
        console.log( "Hér", item); 
        this.newTripsLocationList = [...this.newTripsLocationList, item];

        //this.newTripsLocationList = item;
    }

    removeFromNewTrip(id) {
        function hasSameIdCB(item) {
            return id != item.id;
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
}

export default TripsModel;