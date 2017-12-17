'use strict';

(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;
  var activePin = false;
  var cards = [];
  var commonTemplate = document.querySelector('template').content;
  var mapCardTemplate = commonTemplate.querySelector('.map__card');
  var mapCard = mapCardTemplate.cloneNode(true);
  var mapCardClose = mapCard.querySelector('.popup__close');
  var noticeForm = document.querySelector('.notice__form');
  var fieldsets = noticeForm.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapFiltersArray = map.querySelectorAll('.map__filter');

  var getFeatures = function (item) {
    return '<li class="feature feature--' + item + '"></li>';
  };

  var fillCards = function (card) {
    mapCard.querySelector('.popup__avatar').src = card.author.avatar;
    mapCard.querySelector('h3').textContent = card.offer.title;
    mapCard.querySelector('small').textContent = card.offer.address;
    mapCard.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
    mapCard.querySelector('h4').textContent = card.offer.type;
    mapCard.querySelector('h4 + p').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
    mapCard.querySelector('.popup__checkins').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    mapCard.querySelector('.popup__features').innerHTML = '';
    mapCard.querySelector('.popup__features').insertAdjacentHTML('afterbegin', card.offer.features.map(getFeatures).join(' '));
    mapCard.querySelector('.popup__description').textContent = card.offer.description;
    return mapCard;
  };

  var removePinActive = function () {
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var cardEscKeyDownHandler = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      closePopup();
    }
  };

  var cardCloseEnterKeyDownHandler = function (evt) {
    if (evt.keyСode === ENTER_KEY) {
      closePopup();
    }
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

  var getStartState = function () {
    fieldsets.forEach(function (item, i) {
      fieldsets[i].disabled = true;
    });
    mapFiltersArray.forEach(function (item, j) {
      mapFiltersArray[j].disabled = true;
    });
  };

  var pinClickHandler = function (evt) {
    var target = evt.target;
    var targetId = 0;
    while (target !== mapPins) {
      if (target.tagName === 'BUTTON') {
        removePinActive();
        target.classList.add('map__pin--active');
        activePin = target;
        targetId = activePin.id;
        if (!target.classList.contains('map__pin--main')) {
          fillCards(cards[targetId]);
          openPopup();
        }
        return;
      }
      target = target.parentNode;
    }
  };

  mapCardClose.addEventListener('click', cardCloseClickHandler);
  mapCardClose.addEventListener('keydown', cardCloseEnterKeyDownHandler);

  mapCard.classList.add('hidden');

  window.fillCards = fillCards;
  window.getStartState = getStartState;
  window.pinClickHandler = pinClickHandler;

  cards = window.generateCards();
})();
