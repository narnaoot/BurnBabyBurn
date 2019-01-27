function getColor(magnitude) {
    // Helper function determines color based on magnitude of earthquake
    return magnitude > 5 ? "#bd0026" :
        magnitude > 4 ? "#f03b20" :
            magnitude > 3 ? "#fd8d3c" :
                magnitude > 2 ? "#feb24c" :
                    magnitude > 1 ? "#fed976" :
                        "#ffffb2";
}



function createMap(earthquakeMarkers) {
    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });
// 
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap
    };

    // DEBUGGING: worked with no errors (but also no map) up until this point

    // Create overlayMaps object to hold earthquake layer
    var overlayMaps = {
        "Earthquakes": earthquakeMarkers
    };


    // Create the map object with options
    var map = L.map("mapid", {
        center: [37, -122],
        zoom: 3,
        layers: [lightmap]
    });
    map.addLayer(earthquakeMarkers);

    // DEBUGGING: map showed up, still no errors

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map

    // DEBUGGING: this is the code that introduced the error
    L.control.layers(baseMaps, overlayMaps).addTo(map);

    // Create legend
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 1, 2, 3, 4, 5],
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);






}

function createMarkers(response) {
    // Pull earthquakes off the response
    var earthquakes = response.features;

    // Initialize an array to hold earthquake markers
    var earthquakeMarkers = [];


    // Loop through the array
    for (var index = 0; index < earthquakes.length; index++) {
        // Setting variables for readability
        var earthquake = earthquakes[index];

        var longitude = earthquake.geometry.coordinates[0];
        var latitude = earthquake.geometry.coordinates[1];
        var depth = earthquake.geometry.coordinates[2];

        var title = earthquake.properties.title;
        var magnitude = earthquake.properties.mag;

        // Confirm data is pulling correctly
        console.log("longitude", longitude);
        console.log("latitude", latitude);
        console.log("depth", depth);
        console.log("title", title);
        console.log("magnitude", magnitude);

        // For each earthquake, create a circle marker and bind a popup

        var circleSize = magnitude * 3;

        var singleMarker = L.circleMarker([latitude, longitude], {
            color: getColor(magnitude),
            // fillColor: '#f03',
            fillOpacity: 0.3,
            radius: magnitude * 2
        }).bindPopup("<h3>" + title + "</h3");



        // Add the marker to the array

        earthquakeMarkers.push(singleMarker);

    }
    // Create layer group from the earthquake markers array, pass it to the createMap function
    createMap(L.layerGroup(earthquakeMarkers));

}

// Perform an API call to the USGS earthquake site to pull data. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(data => createMarkers(data));