'use strict';

(function () {
  var activePin = false;
  // var commonTemplate = document.querySelector('template').content;
  // var mapCardTemplate = commonTemplate.querySelector('.map__card');
  // var mapCard = mapCardTemplate.cloneNode(true);
  var mapCard = window.card.mapCard;
  var mapCardClose = mapCard.querySelector('.popup__close');
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  var removePinActive = function () {
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var cardEscKeyDownHandler = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var cardCloseEnterKeyDownHandler = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  var cardCloseClickHandler = function () {
    closePopup();
  };

  var openPopup = function () {
    mapCard.classList.remove('hidden');
    document.addEventListener('keydown', cardEscKeyDownHandler);
  };

  var closePopup = function () {
    mapCard.classList.add('hidden');
    removePinActive();
    activePin = false;
    document.removeEventListener('keydown', cardEscKeyDownHandler);
  };

  var showCard = function (evt) {
    var target = evt.target;
    var targetId = 0;
    while (target !== mapPins) {
      if (target.tagName === 'BUTTON') {
        removePinActive();
        target.classList.add('map__pin--active');
        activePin = target;
        targetId = activePin.dataset.id;
        if (!target.classList.contains('map__pin--main')) {
          // debugger;
          window.card.fillCards(window.cards[targetId]);
          openPopup();
        }
        return;
      }
      target = target.parentNode;
    }
  };

  var bindCardListeners = function () {
    mapCardClose.addEventListener('click', cardCloseClickHandler);
    mapCardClose.addEventListener('keydown', cardCloseEnterKeyDownHandler);
  };

  window.showCard = showCard;

  bindCardListeners();
  window.card.hideMapCard();
})();
