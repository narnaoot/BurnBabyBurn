
// Welcome!  to my project

console.log("hello world")

function getOpacity(size) {
  // Helper function determines opacity of marker based on size (acreage) of fire
  // Fires below 100 acres will not be shown
  return size > 100, 000 ? 1.0 :
    size > 75, 000 ? 0.9 :
      size > 50, 000 ? 0.8 :
      size > 25, 000 ? 0.7 :
      size > 1000 ? 0.3 :
        size > 100 ? 0.1 :
          0.0
}

function createMap(fireMarkers) {
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

  var map = L.map("map-id", {
    center: [36.7378, -119.7871],
    zoom: 6,
    layers: [lightmap, fireMarkers]
  });

  // // Create layer control with both baseMaps & overlayMaps.  Add to map
  L.control.layers(baseMaps, overlayMaps).addTo(map);
}

function createMarkers(fires) {
  // Verify we have data, give sample record
  console.log("Sample fire data:")
  console.log(fires[0]);

  // Initialize an array to hold markers
  var fireMarkers = [];

  // Loop through the array
  for (var index = 0; index < fires.length; index++) {
    // Assign variables for readability
    var fire = fires[index];
    var latitude = fire.LATITUDE;
    var longitude = fire.LONGITUDE;
    var size = fire.FIRE_SIZE;
    var owner = fire.OWNER_DESCR;

    // Only create markers for fires > 100 acres

    if (size > 100) {

      // Create one marker at a time
      var singleMarker = L.marker([latitude, longitude]).bindPopup("<h4>" + size + " acres </h4>");

      // Set opacity based on size (see function above)
      singleMarker.setOpacity(getOpacity(size));

      // Add our new marker to the array
      fireMarkers.push(singleMarker);

    }
  }
  // Create layer group, pass to createMap
  createMap(L.layerGroup(fireMarkers));
}


d3.csv("/static/data/2008_subset.csv").then(data => createMarkers(data));