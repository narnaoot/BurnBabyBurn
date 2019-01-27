
// Welcome!  to my project

console.log("hello world")

function createMap(fireMarkers) {
  console.log("got here")
// Making the basemap
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

// Create baseMaps obejct

var baseMaps = {
  "Light Map": lightmap
};

// Create overlap map for fires
var overlayMaps = {
  "Fires": fireMarkers
};

var map = L.map("map-id",{
  center: [34.4, -118.4],  
  zoom: 4,
  layers: [lightmap, fireMarkers]
});

// // map.addLayer(fireMarkers);
// fireMarkers.addTo(map);

// // Create layer control with both baseMaps & overlayMaps.  Add to map
L.control.layers(baseMaps, overlayMaps).addTo(map);



}



function createMarkers(fires) {
  // Verify we have data
  console.log(fires[0]);

  // Initialize an array to hold markers
  var fireMarkers = [];

  // Loop through the array
  for (var index = 0; index < 50; index++) {
    // Assign variables for readability
    var fire = fires[index];
    var latitude = fire.LATITUDE;
    var longitude = fire.LONGITUDE;
    console.log(latitude, longitude)

    // Create one marker at a time
    var singleMarker = L.marker([latitude, longitude]).bindPopup("yay");

    // Add our new marker to the array
    fireMarkers.push(singleMarker);
 
  }
  // Create layer group, pass to createMap
  console.log("reached just before the create map function call")
  createMap(L.layerGroup(fireMarkers));
 

}



d3.csv("/static/data/2008_subset.csv").then(data => createMarkers(data));