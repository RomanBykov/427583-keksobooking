'use strict';

(function () {
  var mapCardTemplate = window.pin.template.querySelector('.map__card');
  var cardTemplate = mapCardTemplate.cloneNode(true);

  var getFeatures = function (item) {
    return '<li class="feature feature--' + item + '"></li>';
  };

  var getPhotos = function (item) {
    return '<li><img src="' + item + '"></li>';
  };

  var AppartmentTypes = {
    flat: 'Квартира',
    bungalo: 'Лачуга',
    house: 'Дом',
    palace: 'Дворец'
  };

  var fillCards = function (card) {
    var cardTemplatePictures = cardTemplate.querySelector('.popup__pictures');
    var cardTemplateFeatures = cardTemplate.querySelector('.popup__features');
    cardTemplate.querySelector('.popup__avatar').src = card.author.avatar;
    cardTemplate.querySelector('h3').textContent = card.offer.title;
    cardTemplate.querySelector('small').textContent = card.offer.address;
    cardTemplate.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
    cardTemplate.querySelector('h4').textContent = AppartmentTypes[card.offer.type];
    cardTemplate.querySelector('h4 + p').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
    cardTemplate.querySelector('.popup__checkins').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardTemplate.querySelector('.popup__description').textContent = card.offer.description;
    cardTemplateFeatures.innerHTML = '';
    cardTemplateFeatures.insertAdjacentHTML('afterbegin', card.offer.features.map(getFeatures).join(' '));
    cardTemplate.appendChild(cardTemplateFeatures);
    cardTemplatePictures.innerHTML = '';
    cardTemplatePictures.insertAdjacentHTML('afterbegin', card.offer.photos.map(getPhotos).join(''));
    cardTemplate.appendChild(cardTemplatePictures);
    return cardTemplate;
  };

  var hideMapCard = function () {
    cardTemplate.classList.add('hidden');
  };

  window.card = {
    fillCards: fillCards,
    hideMapCard: hideMapCard,
    mapCard: cardTemplate,
    allCards: [],
    filteredCards: []
  };

})();
