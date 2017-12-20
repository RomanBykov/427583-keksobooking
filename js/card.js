'use strict';

(function () {
  var commonTemplate = document.querySelector('template').content;
  var mapCardTemplate = commonTemplate.querySelector('.map__card');
  var mapCard = mapCardTemplate.cloneNode(true);

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

  var hideMapCard = function () {
    mapCard.classList.add('hidden');
  };

  window.card = {
    fillCards: fillCards,
    hideMapCard: hideMapCard,
    mapCard: mapCard
  };
})();
