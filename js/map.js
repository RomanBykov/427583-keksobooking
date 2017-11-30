'use strict';

// п.1 Создайте массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалеку.
var OFFERS_HEADINGS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var HOUSE_TYPES = ['flat', 'house', 'bungalo'];

var CHECKINS = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var cards = [];

var pinsAmount = 8;

var commonTemplate = document.querySelector('template');

// общий рандом
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var shuffle = function (arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var randomNumber = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[randomNumber];
    arr[randomNumber] = temp;
  }
  return arr;
};

var features = shuffle(FEATURES).slice(0, getRandomNumber(1, FEATURES.length));

var getFeatures = function (item) {
  return '<li class="feature feature--' + item + '"></li>';
};

var AppartmentTypes = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var getAppartmentTypes = function () {
  var randomType = HOUSE_TYPES[getRandomNumber(0, 3)];
  return AppartmentTypes [randomType];
};

// создаю массив 8 карточек
var generateCards = function () {
  for (var i = 0; i < pinsAmount; i++) {
    var locationX = getRandomNumber(300, 900);
    var locationY = getRandomNumber(100, 500);

    cards[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: OFFERS_HEADINGS[getRandomNumber(0, 8)],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(1000, 1000000),
        type: getAppartmentTypes(),
        rooms: getRandomNumber(1, 6),
        guests: getRandomNumber(1, 15),
        checkin: CHECKINS[getRandomNumber(0, 3)],
        checkout: CHECKINS[getRandomNumber(0, 3)],
        features: features,
        description: '',
        photos: []
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }
  return cards;
};

// п.2 У блока .map уберите класс .map--faded
var showMap = document.querySelector('.map');
showMap.classList.remove('map--faded');

// п.3 На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте,
// и заполните их данными из массива. Итоговая разметка метки должна выглядеть следующим образом:
// <button style="left: {{location.x}}px; top: {{location.y}}px;" class="map__pin">
//   <img src="{{author.avatar}}" width="40" height="40" draggable="false">
// </button>

var mapPinTemplate = commonTemplate.content.querySelector('.map__pin');

var renderMapPins = function (mapPin) {
  var pinElement = mapPinTemplate.cloneNode(true);

  pinElement.style.left = mapPin.location.x + 'px';
  pinElement.style.top = mapPin.location.y + 'px';
  pinElement.querySelector('img').src = mapPin.author.avatar;

  return pinElement;
};

// п.4 Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment
cards = generateCards();

var pins = document.querySelector('.map__pins');

var fragmentPins = document.createDocumentFragment();

cards.forEach(function (item) {
  fragmentPins.appendChild(renderMapPins(item));
});

pins.appendChild(fragmentPins);

// п.5 На основе первого по порядку элемента из сгенерированного массива и шаблона template article.map__card
// создайте DOM-элемент объявления, заполните его данными из объекта и вставьте полученный DOM-элемент в блок
// .map перед блоком .map__filters-container

// создайте DOM-элемент объявления
var cardTemplate = commonTemplate.content.querySelector('.map__card');

// заполните его данными из объекта
var renderCards = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('h3').textContent = card.offer.title;
  cardElement.querySelector('small').textContent = card.offer.address;
  cardElement.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
  cardElement.querySelector('h4').textContent = card.offer.type;
  cardElement.querySelector('h4 + p').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.checkins').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').insertAdjacentHTML('afterbegin', card.offer.features.map(getFeatures).join(' '));
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

var fragmentCards = document.createDocumentFragment();

fragmentCards.appendChild(renderCards(cards[getRandomNumber(0, 8)]));
// вставьте полученный DOM-элемент в блок .map
showMap.appendChild(fragmentCards);
