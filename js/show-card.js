'use strict';

(function () {
  var activePin = false;
  var mapCard = window.card.mapCard;
  var mapCardClose = mapCard.querySelector('.popup__close');
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var fragmentCard = document.createDocumentFragment();

  var removeActive = function () {
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var cardEscKeyDownHandler = function (evt) {
    window.util.isEscEvent(evt, close);
  };

  var cardCloseEnterKeyDownHandler = function (evt) {
    window.util.isEnterEvent(evt, close);
  };

  var cardCloseClickHandler = function () {
    close();
  };

  var open = function () {
    mapCard.classList.remove('hidden');
    document.addEventListener('keydown', cardEscKeyDownHandler);
  };

  var close = function () {
    mapCard.classList.add('hidden');
    removeActive();
    activePin = false;
    document.removeEventListener('keydown', cardEscKeyDownHandler);
  };

  var showCard = function (evt) {
    var target = evt.target;
    var targetId = 0;
    while (target !== mapPins) {
      if (target.tagName === 'BUTTON') {
        removeActive();
        target.classList.add('map__pin--active');
        activePin = target;
        targetId = activePin.dataset.id;
        if (!target.classList.contains('map__pin--main')) {
          var pinsStorage = window.card.filteredCards.length > 0 ? window.card.filteredCards : window.card.allCards;
          fragmentCard.appendChild(window.card.fillCards(pinsStorage[targetId]));
          map.appendChild(fragmentCard);
          open();
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

  window.card.hideMapCard();
  bindCardListeners();

  window.showCard = {
    showSelectedCard: showCard,
    close: close,
    map: map,
    mapPins: mapPins
  };

})();
