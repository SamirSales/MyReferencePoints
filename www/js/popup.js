
// $$('.close-popup').on('click', function(){
//   frameWork7.closeModal('popup-services');
// });

$$('.popup-services').on('open', function () {
  map.setClickable(false);
});
$$('.popup-services').on('closed', function () {
  map.setClickable(true);
});

$$('#save_btn_pu').on('click', function(){
  // saving new location
  saveNewLocation(null, markerSelectedLat, markerSelectedLng,
    $$("#input_title_pu").val(), $$("#address_pu").text());

  map.clear();
  getMyLocation();
  frameWork7.closeModal('.popup-services');
});

$$('#del_btn_pu').on('click', function(){
  //TODO: ask for confimation
  alert('teste!!!!!!!');
  frameWork7.closeModal('.popup-services');
});
