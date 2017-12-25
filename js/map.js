'use strict';

(function () {
  var fragmentPins = document.createDocumentFragment();
  var fragmentCards = document.createDocumentFragment();
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');

  var mainPinMouseUpHandler = function () {
    map.classList.remove('map--faded');
    mapPins.appendChild(fragmentPins);
    noticeForm.classList.remove('notice__form--disabled');
    window.util.setInputsAbled();
  };

  var mainPinKeyDownHandler = function (evt) {
    window.util.isEnterEvent(evt, mainPinMouseUpHandler);
    window.util.isSpaceEvent(evt, mainPinMouseUpHandler);
  };

  var bindMapListeners = function () {
    mapPins.addEventListener('click', window.showCard);
    mainPin.addEventListener('mouseup', mainPinMouseUpHandler);
    mainPin.addEventListener('keydown', mainPinKeyDownHandler);
  };

  var fillCardsAndPins = function () {
    window.backend.load(function (cardsData) {
      window.card.allCards = cardsData;

      window.card.allCards.forEach(function (item, i) {
        fragmentPins.appendChild(window.renderMapPins(item, i));
      });

      fragmentCards.appendChild(window.card.fillCards(window.card.allCards[0]));
      map.appendChild(fragmentCards);
    }, window.error.errorHandler);
  };


  bindMapListeners();
  fillCardsAndPins();

})();
