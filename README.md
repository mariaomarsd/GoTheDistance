# Getting Started

git clone https://github.com/mariaomarsd/GoTheDistance.git

cd client

### `npm install`
### `npm start`

## Project Description 

A website that keeps track of all your travels. You can see a visual representation of all your travels (displayed as lined on the map), view individual trips in more detail and see statistics about your travels. To add a new trip you can either search for the places you want to add to the trip or choose them from the map. When you have added all the places that you visited you can create the trip and it is added to your list of trips. 

## What we have done

Displayed a map of the world using a Google Maps API.

Created an expandable sidebar menu with 4 components:
- New trip
    - This component allows you to search for a place using a search bar and add it to your trip, you can also remove places from the list.
    - When a place is added to the list, a line is drawn between the previous place and the newest place and displayed on the map.
- My trips
    - Shows all the trips that the user has created and displays them in a list. Currently it shows hard coded entries. 
- Statistics
    - Displays statistics about the user's travels. Currently, it has includes only hard coded statistics.
- Profile
    - Displays user’s information (todo).

Draw polylines between each location when the user adds a new trip containing the location visited. 


## What we plan to do

- Save and display list of each trip that the user has added + lines on the map.
- Enable the user to name each trip that the user has added.
- Enable the user to see list of old trips and click on each trip to get additional information for example places visited in that specific trip.
- Fetch, save and display personal statics to the user: 
    - Distance traveled 
    - Countries visited 
    - Number of places explored 
    - Number of continents visited
- Allow user to change styles on the map.
- Add authentication system to allow the user to log in/log out.
- Save user data in Firebase. 

## File Structure

We split the project into a client (frontend) and server (backend).

### Client

- App.js: Used to render the main presenter.

#### Presetners

- mainPresenter.js: Renders the map and sidebar 

#### Views

- mapView.js: Here the Google maps is called and presented in the view. Providing zoom and ability for the user to move the view around the map. Polyline is used to draw lines between LatLng coordinates on the map. 

- myTripView.js: Renders different trips for the user. The user can choose which trips they see on the map by checking each checkbox.

- newTripView.js: Here the user can search for locations and chose the correct one. Here we have a call to a places API that maps out locations that the user is searching for. The user can add a locations to their trip and the chosen location are presented to the user. The user can delete and add as many locations as they want.

- sidebarView.js: Renders the Sidebar menu with the four different components by rendering a sidebarViewMenu component for each of the four components

- sidebarViewMenu.js: Renders a component with a title and content
Hides/Shows the content when the title is clicked

- statisticsView.js:Renders a component that includes statistics about the user’s travels

- profileView.js: #TODO

#### Styles

All files that provide the styling for the website, the files are named according to which view they are styling.

### Server

#TODO