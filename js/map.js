'use strict';

var OFFERS_HEADINGS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var HOUSE_TYPES = ['flat', 'house', 'bungalo'];

var CHECKINS = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var cards = [];

var showMap = document.querySelector('.map');

//получаю содержимое шаблона
var cardTemplate = document.querySelector('template').content;

var randomIndex = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var randomFeaturesIndex = function () {
  return Math.floor(Math.random() * FEATURES.length + 1);
};

var randomFeatures = function () {
  var featuresList = [];
  for (var i = 0; i < randomFeaturesIndex(); i++) {
    featuresList[i] = FEATURES[i];
  }
  return featuresList;
};

for (var i = 0; i < 8; i++) {
  cards[i] = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: OFFERS_HEADINGS[i],
      // address: location.randomIndex(300, 900), location.randomIndex(100, 500),
      price: randomIndex(1000, 1000000),
      type: HOUSE_TYPES[randomIndex(0, 2)],
      rooms: randomIndex(1, 5),
      guests: randomIndex(1, 15),
      checkin: CHECKINS[randomIndex(0, 2)],
      checkout: CHECKINS[randomIndex(0, 2)],
      features: randomFeatures(),
      description: '',
      photos: []
    }
  }
}

showMap.classList.remove('map--faded');

var renderCards = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('img').src = card.author.avatar;
  cardElement.querySelector('h3').textContent = card.offer.title;
  cardElement.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
  cardElement.querySelector('h4 + p').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.checkins').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').insertAdjacentHTML('afterbegin', '<li class="features feature--' + card.offer.features + '"></li>');

  return cardElement;
}

var fragment = document.createDocumentFragment();

for (var i = 0; i < 1; i++) {
  fragment.appendChild(renderCards(cards[i]));
}

var similarListElement = document.querySelector('.map__pins');

showMap.appendChild(fragment);
