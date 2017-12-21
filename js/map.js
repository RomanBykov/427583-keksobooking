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

  var cards = [];

  debugger;
  var fillCardsAndPins = function () { //ПОЧЕМУ ФУНКЦИЯ ВМЕСТО РАБОТЫ СНАЧАЛА ПРОСКАКИВАЕТ НЕВЫПОЛЕНННОЙ, А ПОТОМ ПОСЛЕ ПРОХОДА ПО ВСЕМ МОДУЛЯМ ВОЗВРАЩАЕТСЯ И НАКОНЕЦ ДЕЛАЕТ СВОЮ ЧЕРТОВУ РАБОТУ?!!!!!ааааааё!!
    debugger;
    window.backend.load(function (cardsData) {
      debugger;
      cards = cardsData.slice();
      cards.forEach(function (item, i) {
        debugger;
        fragmentPins.appendChild(window.renderMapPins(item, i));
      });
      debugger;
      fragmentCards.appendChild(window.card.fillCards(cards[0]));
      map.appendChild(fragmentCards);
    });
  };

  window.cards = cards;
  bindMapListeners();
  fillCardsAndPins();
})();
