'use strict';

(function () {
  var LOAD_TIMEOUT = 3000;
  var MAX_FILTERED_NUMBER = 5;
  var fragmentPins = document.createDocumentFragment();
  var fragmentCards = document.createDocumentFragment();
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var mapFilters = map.querySelector('.map__filters');

  var mainPinMouseUpHandler = function () {
    showPins();
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    window.util.setInputsAbled();
  };

  var mainPinKeyDownHandler = function (evt) {
    window.util.isEnterEvent(evt, mainPinMouseUpHandler);
    window.util.isSpaceEvent(evt, mainPinMouseUpHandler);
  };

  var filterChangeHandler = function () {
    window.debounce(showAndRemovePins);
  };

  var bindMapListeners = function () {
    mapPins.addEventListener('click', window.showCard);
    mainPin.addEventListener('mouseup', mainPinMouseUpHandler);
    mainPin.addEventListener('keydown', mainPinKeyDownHandler);
    mapFilters.addEventListener('change', filterChangeHandler);
  };

  var showPins = function () {
    if (window.card.allCards) {
      var pinsList = window.filterData(window.card.allCards).slice(0, MAX_FILTERED_NUMBER);
      pinsList.forEach(function (item, i) {
        fragmentPins.appendChild(window.renderMapPins(item, i));
      });
      mapPins.appendChild(fragmentPins);
      fragmentCards.appendChild(window.card.fillCards(window.card.allCards[0]));
      map.appendChild(fragmentCards);
    } else {
      setTimeout(function () {
        showPins();
      }, LOAD_TIMEOUT);
    }
  };

  var removePins = function () {
    var pinsList = map.querySelectorAll('.map__pin:not(map__pin--main)');
    Array.prototype.forEach.call(pinsList, function (pin) {
      mapPins.removeChild(pin);
    });
  };

  var showAndRemovePins = function () {
    removePins();
    showPins();
  };

  window.backend.load(function (cardsData) {
    window.card.allCards = cardsData;
  }, window.error.errorHandler);

  bindMapListeners();

})();
