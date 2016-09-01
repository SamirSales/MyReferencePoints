
// $$('.close-popup').on('click', function(){
//   frameWork7.closeModal('popup-services');
// });

$$('.popup-services').on('open', function () {
  map.setClickable(false);
});
$$('.popup-services').on('closed', function () {
  map.setClickable(true);
});
