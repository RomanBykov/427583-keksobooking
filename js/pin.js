'use strict';

(function () {
  var template = document.querySelector('template').content;
  var mapPinTemplate = template.querySelector('.map__pin');

  var renderMapPins = function (pin, pinIndex) {
    var mapPin = mapPinTemplate.cloneNode(true);
    mapPin.style.left = pin.location.x + 'px';
    mapPin.style.top = pin.location.y + 'px';
    mapPin.querySelector('img').src = pin.author.avatar;
    mapPin.dataset.id = pinIndex;
    return mapPin;
  };

  window.renderMapPins = renderMapPins;
  window.pin = {
    renderMapPins: renderMapPins,
    template: template
  };

})();
