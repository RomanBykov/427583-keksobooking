'use strict';

(function () {
  var commonTemplate = document.querySelector('template').content;
  var mapPinTemplate = commonTemplate.querySelector('.map__pin');

  var renderMapPins = function (pin) {
    var mapPin = mapPinTemplate.cloneNode(true);
    mapPin.style.left = pin.location.x + 'px';
    mapPin.style.top = pin.location.y + 'px';
    mapPin.querySelector('img').src = pin.author.avatar;
    mapPin.setAttribute('id', pin.author.number);
    return mapPin;
  };

  window.renderMapPins = renderMapPins;
})();
