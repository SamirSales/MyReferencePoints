
var myApp = new Framework7({
  swipePanel: 'left'
});

$$('.panel-left').on('opened', function () {
    map.setClickable(false);
});
$$('.panel-left').on('close', function () {
    map.setClickable(true);
});
