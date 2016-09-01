
var myApp = new Framework7({
  swipePanel: 'left'
});

$$('.panel-left').on('opened', function () {
    map.setClickable(false);
});
$$('.panel-left').on('close', function () {
    map.setClickable(true);
});

var searchBar = myApp.searchbar('.searchbar', {
    customSearch: true,
    onSearch: function(s) {
        // myApp.alert('onSearch! - '+s);
    },
    onClear: function(s) {
        // myApp.alert('onClear - '+s);
    }
});

$$("#searchForm").on( 'submit', function(event) {
  var text = $$('#searchInput').val();
  // myApp.alert('onSearch! - '+text);
  geoLocation(text);
  $$('#searchInput').val('');
  myApp.closePanel();
});
