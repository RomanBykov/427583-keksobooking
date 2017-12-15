'use strict';

(function () {
  var ENTER_KEY = 13;
  var SPACE_KEY = 32;
  var cards = [];
  var fragmentPins = document.createDocumentFragment();
  var fragmentCards = document.createDocumentFragment();
  var commonTemplate = document.querySelector('template').content;
  var mapCardTemplate = commonTemplate.querySelector('.map__card');
  var mapCard = mapCardTemplate.cloneNode(true);
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var fieldsets = noticeForm.querySelectorAll('fieldset');
  var mapFiltersArray = map.querySelectorAll('.map__filter');

  var mainPinMouseUpHandler = function () {
    map.classList.remove('map--faded');
    mapPins.appendChild(fragmentPins);
    noticeForm.classList.remove('notice__form--disabled');
    fieldsets.forEach(function (item, i) {
      fieldsets[i].disabled = false;
    });
    mapFiltersArray.forEach(function (item, j) {
      mapFiltersArray[j].disabled = false;
    });
  };

  var mainPinKeyDownHandler = function (evt) {
    if (evt.keyCode === SPACE_KEY || evt.keyCode === ENTER_KEY) {
      mainPinMouseUpHandler();
    }
  };

  mainPin.addEventListener('mouseup', mainPinMouseUpHandler);
  mainPin.addEventListener('keydown', mainPinKeyDownHandler);

  window.getStartState();
  cards = window.generateCards();
  // оборачиваю в DOM-элемент пины
  cards.forEach(function (item) {
    fragmentPins.appendChild(window.renderMapPins(item));
  });
  // оборачиваю в другой DOM-элемент карточки
  fragmentCards.appendChild(window.fillCards(cards[window.getRandomNumber(0, 8)]));
  // вставляю полученный DOM-элемент с карточками в блок .map
  map.appendChild(fragmentCards);
  mapCard.classList.add('hidden');
})();
