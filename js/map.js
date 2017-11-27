'use strict';

var OFFERS_HEADINGS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var HOUSE_TYPES = ['flat', 'house', 'bungalo'];

var CHECKINS = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var cards = [];

var mapPins = [];

var showMap = document.querySelector('.map');

//получаю содержимое шаблона
var cardTemplate = document.querySelector('template').content;

var mapPinTemplate = document.querySelector('.map__pin').content;

//общий рандом
var randomIndex = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

//рандом для features
var randomFeaturesIndex = function () {
  return Math.floor(Math.random() * FEATURES.length + 1);
};

//получаю массив features рандомной длины
var randomFeatures = function () {
  var featuresList = [];
  for (var i = 0; i < randomFeaturesIndex(); i++) {
    featuresList[i] = FEATURES[i];
  }
  return featuresList;
};

//создаю массив из 8 карточек
for (var i = 0; i < 8; i++) {
  cards[i] = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: OFFERS_HEADINGS[i],
      address: location.x + ', ' + location.y,
      price: randomIndex(1000, 1000000),
      type: HOUSE_TYPES[randomIndex(0, 2)],
      rooms: randomIndex(1, 5),
      guests: randomIndex(1, 15),
      checkin: CHECKINS[randomIndex(0, 2)],
      checkout: CHECKINS[randomIndex(0, 2)],
      features: randomFeatures(),
      description: '',
      photos: []
    },
    location: {
      x: randomIndex(300, 900),
      y: randomIndex(100, 500)
    }
  }
}

for (var i = 0; i < 8; i++) {
  mapPins[i] = {

  }
}

showMap.classList.remove('map--faded');

//создаю объект со своими данными на основе шаблона
var renderCards = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('img').src = card.author.avatar;
  cardElement.querySelector('h3').textContent = card.offer.title;
  cardElement.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
  cardElement.querySelector('h4 + p').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.checkins').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  // не понимаю, почему рандом features тут не работает. создал свои классы для <p>, в задании вроде не запрещено, а по другому не получилось обратиться
  cardElement.querySelector('.popup__features').insertAdjacentHTML('afterbegin', '<li class="features feature--' + card.offer.features + '"></li>');
  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  return cardElement;
}

//п.3 создаю DOM-элементы
var renderMapPins = function (mapPin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  //не понимаю, почему не отрисовываются аватары
  pinElement.querySelector('img').src = mapPin.author.avatar;
  pinElement.querySelector('.map__pin').style.left = mapPin.location.x + 'px';
  pinElement.querySelector('.map__pin').style.top = mapPin.location.y + 'px';

  return pinElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < cards.length; i++) {
  fragment.appendChild(renderCards(cards[i]));
}

// var similarListElement = document.querySelector('.map__pins');

showMap.appendChild(fragment);
