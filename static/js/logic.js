function createMarkers(response) {
  // Pull earthquakes off the response
  console.log(response);
}



d3.csv("/data/fire_data_1993.csv").then(data => createMarkers(data));