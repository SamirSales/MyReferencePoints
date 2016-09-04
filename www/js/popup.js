

$$('.popup-services').on('open', function () {
  map.setClickable(false);
});
$$('.popup-services').on('closed', function () {
  map.setClickable(true);
});

$$('#save_btn_pu').on('click', function(){

  if(idForEditLocation == null){
    // saving new location
    saveNewLocation(null, markerSelectedLat, markerSelectedLng,
      $$("#input_title_pu").val(), $$("#address_pu").text());
  }else{
    //TODO edition
  }

  map.clear();
  getMyLocation();
  frameWork7.closeModal('.popup-services');
});

$$('#del_btn_pu').on('click', function () {
  frameWork7.confirm('Are you sure you want to delete this location?',
    'Removal Confirmation', function () {
    removeLocationDB(idForEditLocation);

    map.clear();
    getMyLocation();
    frameWork7.closeModal('.popup-services');
  },
    function () {
      //cancel action
  });
});
