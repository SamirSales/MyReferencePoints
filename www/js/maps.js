var map;
document.addEventListener("deviceready", function() {
  var div = document.getElementById("map_canvas");

  // default location
  const MAP_CENTER = new plugin.google.maps.LatLng(0,0);

  // Initialize the map view
  map = plugin.google.maps.Map.getMap(div,{
    'backgroundColor': 'white',
    'mapType': plugin.google.maps.MapTypeId.ROADMAP,
    'controls': {
      'compass': true,
      'myLocationButton': true,
      'indoorPicker': true,
      'zoom': true
    },
    'gestures': {
      'scroll': true,
      'tilt': true,
      'rotate': true,
      'zoom': true
    },
    'camera': {
      'latLng': MAP_CENTER,
      'tilt': 0,
      'zoom': 16,
      'bearing': 50
    }
  });
  // Wait until the map is ready status.
  map.addEventListener(plugin.google.maps.event.MAP_READY, getMyLocation);

}, false);

function getMyLocation(){
  map.getMyLocation(function(location) {
    map.addMarker({
      'icon': 'blue',
      'position': location.latLng,
      'title': 'You are here!'
    }, function(marker) {
      map.moveCamera({
        'target': location.latLng,
      }, function() {
        marker.showInfoWindow();
      });
    });
  });
}

function geoLocation(search){
  var request = {
    'address': search
  };
  plugin.google.maps.Geocoder.geocode(request, function(results) {
    if (results.length) {
      var result = results[0];
      var position = result.position;

      map.addMarker({
        'position': position,
        'title':  search.toUpperCase() // JSON.stringify(result.position)
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
