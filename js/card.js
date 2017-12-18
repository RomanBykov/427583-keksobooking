'use strict';

(function () {

  var activePin = false;
  var commonTemplate = document.querySelector('template').content;
  var mapCardTemplate = commonTemplate.querySelector('.map__card');
  var mapCard = mapCardTemplate.cloneNode(true);
  var mapCardClose = mapCard.querySelector('.popup__close');
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

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
    mapCard.querySelector('.popup__pictures').innerHTML = '';
    return mapCard;
  };

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
          fillCards(window.data.allCards[targetId]);
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

  var hideMapCard = function () {
    mapCard.classList.add('hidden');
  };

  bindCardListeners();

  window.card = {
    fillCards: fillCards,
    pinClickHandler: pinClickHandler,
    hideMapCard: hideMapCard
  };

})();
