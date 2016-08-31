var map;
document.addEventListener("deviceready", function() {
  var div = document.getElementById("map_canvas");
  // Initialize the map view
  map = plugin.google.maps.Map.getMap(div);
  // Wait until the map is ready status.
  map.addEventListener(plugin.google.maps.event.MAP_READY, geoLocation);

}, false);

function geoLocation(){
  var request = {
    'address': 'Fortaleza'
  };
  plugin.google.maps.Geocoder.geocode(request, function(results) {
    if (results.length) {
      var result = results[0];
      var position = result.position;

      map.addMarker({
        'position': position,
        'title':  JSON.stringify(result.position)
      }, function(marker) {

        map.animateCamera({
          'target': position,
          'zoom': 16
        }, function() {
          marker.showInfoWindow();
        });

      });
    } else {
      alert("Not found");
    }
  });
}
