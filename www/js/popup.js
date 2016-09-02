
// $$('.close-popup').on('click', function(){
//   frameWork7.closeModal('popup-services');
// });

$$('.popup-services').on('open', function () {
  map.setClickable(false);
});
$$('.popup-services').on('closed', function () {
  map.setClickable(true);
});

$$('#save_btn_up').on('click', function(){
  //TODO: save
  frameWork7.closeModal('popup-services');
});

$$('#del_btn_up').on('click', function(){
  //TODO: ask for confimation
  // frameWork7.closeModal('popup-services');
});
