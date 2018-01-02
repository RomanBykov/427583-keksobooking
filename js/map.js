'use strict';

(function () {
  var MAX_FILTERED_NUMBER = 5;
  var fragmentPins = document.createDocumentFragment();
  var mapFilters = window.showCard.map.querySelector('.map__filters');

  var mainPinMouseUpHandler = function () {
    removeMainPinListeners();
    showPins();
    window.showCard.map.classList.remove('map--faded');
    window.form.noticeForm.classList.remove('notice__form--disabled');
    window.util.setInputsAbled();
    window.form.setFormToDefault();
  };

  var mainPinKeyDownHandler = function (evt) {
    window.util.isEnterEvent(evt, mainPinMouseUpHandler);
    window.util.isSpaceEvent(evt, mainPinMouseUpHandler);
  };

  var removeMainPinListeners = function () {
    window.form.mainPin.removeEventListener('mouseup', mainPinMouseUpHandler);
    window.form.mainPin.removeEventListener('keydown', mainPinKeyDownHandler);
  };

  var filterChangeHandler = function () {
    window.debounce(showAndRemovePins);
  };

  var bindMapListeners = function () {
    window.showCard.mapPins.addEventListener('click', window.showCard.showSelectedCard);
    window.form.mainPin.addEventListener('mouseup', mainPinMouseUpHandler);
    window.form.mainPin.addEventListener('keydown', mainPinKeyDownHandler);
    mapFilters.addEventListener('change', filterChangeHandler);
  };

  var showPins = function () {
    window.card.filteredCards = window.filterData(window.card.allCards).slice(0, MAX_FILTERED_NUMBER);
    window.card.filteredCards.forEach(function (item, i) {
      fragmentPins.appendChild(window.pin.renderMapPins(item, i));
    });
    window.showCard.mapPins.appendChild(fragmentPins);
  };

  var removePins = function () {
    var pinsList = window.showCard.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    Array.prototype.forEach.call(pinsList, function (pin) {
      window.showCard.mapPins.removeChild(pin);
    });
  };

  var showAndRemovePins = function () {
    window.showCard.close();
    removePins();
    showPins();
  };

  window.backend.load(function (cardsData) {
    window.card.allCards = cardsData;
  }, window.error.errorHandler);

  window.util.setInputsDisabled();
  bindMapListeners();
})();
