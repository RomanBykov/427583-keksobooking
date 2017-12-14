'use strict';

(function () {
  var commonTemplate = document.querySelector('template').content;
  var popupTemplate = commonTemplate.querySelector('.popup');
  var popupItem = popupTemplate.cloneNode(true);

  var getFeatures = function (item) {
    return '<li class="feature feature--' + item + '"></li>';
  };

  var fillCards = function (card) {
    popupItem.querySelector('.popup__avatar').src = card.author.avatar;
    popupItem.querySelector('h3').textContent = card.offer.title;
    popupItem.querySelector('small').textContent = card.offer.address;
    popupItem.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
    popupItem.querySelector('h4').textContent = card.offer.type;
    popupItem.querySelector('h4 + p').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
    popupItem.querySelector('.popup__checkins').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    popupItem.querySelector('.popup__features').innerHTML = '';
    popupItem.querySelector('.popup__features').insertAdjacentHTML('afterbegin', card.offer.features.map(getFeatures).join(' '));
    popupItem.querySelector('.popup__description').textContent = card.offer.description;
    return popupItem;
  };

  window.fillCards = fillCards;
})();
