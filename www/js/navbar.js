
var frameWork7 = new Framework7({
  swipePanel: 'left'
});

$$('.panel-left').on('opened', function () {
    map.setClickable(false);
});
$$('.panel-left').on('close', function () {
    map.setClickable(true);
});

var searchBar = frameWork7.searchbar('.searchbar', {
    customSearch: true,
    onSearch: function(s) {
        // frameWork7.alert('onSearch! - '+s);
    },
    onClear: function(s) {
        // frameWork7.alert('onClear - '+s);
    }
});

$$("#searchForm").on( 'submit', function(event) {
  var text = $$('#searchInput').val();
  // frameWork7.alert('onSearch! - '+text);
  geoLocation(text);
  $$('#searchInput').val('');
  frameWork7.closePanel();
});

$$("#refreshBtn").on( 'click', function(event) {
  frameWork7.closePanel();
  map.clear();
  getMyLocation();
});

$$("#roadmap_link").on( 'click', function(event) {
  frameWork7.closePanel()
  map.setMapTypeId(plugin.google.maps.MapTypeId.ROADMAP);
});

$$("#satellite_link").on( 'click', function(event) {
  frameWork7.closePanel();
  map.setMapTypeId(plugin.google.maps.MapTypeId.SATELLITE);
});

$$("#hybrid_link").on( 'click', function(event) {
  frameWork7.closePanel();
  map.setMapTypeId(plugin.google.maps.MapTypeId.HYBRID);
});

$$("#terrain_link").on( 'click', function(event) {
  frameWork7.closePanel();
  map.setMapTypeId(plugin.google.maps.MapTypeId.TERRAIN);
});
