// +++++++++++++++++++++++++++++++++++++
// Logic.js for "Yo Momma Fell" Homework
// +++++++++++++++++++++++++++++++++++++
// I chose the GeoJSON for significant earthquakes within the last 30 days

// Making the basemap
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 5,
  id: "mapbox.light",
  accessToken: API_KEY
});

// init map
var map = L.map("map-id", {
  center: [46.207,6.150],
  zoom: 2.4
})

// Add basemap to map
lightmap.addTo(map);

// Create a legend to display information about our map
var legend = L.control({
  position: "bottomright"
});

// Insert a div with class of legend
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};

// Add the info legend to the map
legend.addTo(map);

// Function for choosing the color
// Color depth and magnitude are positively correlated
// Breaks are chosen from widely accepted classification of earthquakes
function getColor(jiggle_power) {
  // 6, 7, and 8 are classiified as strong, major, and great; respectively
  return jiggle_power > 6 ? '#3d1010':
    // 5.1-6 are classified as moderate
    jiggle_power > 5 ? '#8e2525':
    // 4.1-5 and 3.1-4 are classified as light and minor; respectively
    jiggle_power > 3 ? '#cb3434':
    // Anything lower and yo momma just stumbled and didn't fall
    // More so a jiggle than a quake so we don't care as much
    '#eaaeae';
}

// Perform an API call to USGS for the data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function (data) {
  function onEachFeature(features, layer) {
    var popupContent = "<h3>" + features.properties.mag + "on the Richter scale</h3><hr>" +
    ", it was" + features.properties.depth + "in depth from the surface" + "</h3><hr>" + 
    " and was classified as a " + features.properties.type + "</h3><hr>";
    layer.bindPopup(popupContent);
  }
	L.geoJSON(data, {
  	onEachFeature: onEachFeature,
		pointToLayer: function (features, latlng) {
			return L.circleMarker(latlng, {
				radius: features.properties.mag*2.5,
				fillColor: getColor(features.properties.mag),
				color: "#000",
				weight: 1,
				opacity: 1,
				fillOpacity: 0.8
			});
		}
	}).addTo(map);
})
