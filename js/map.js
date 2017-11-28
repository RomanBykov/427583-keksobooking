'use strict';

//п.1 Создайте массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалеку.
var OFFERS_HEADINGS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
'Неуютное бунгало по колено в воде'];

var HOUSE_TYPES = ['flat', 'house', 'bungalo'];

var CHECKINS = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var cards = [];

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

// var generateFeatures = function () {
//   ПРИДУМАТЬ ФУНКЦИЮ ВСТАВКИ ЭЛЕМЕНТОВ ИЗ МАССИВА FEATURES В <li></li>
// };

var getFlatType = function () {
  var flatType = '';
  var randomType = HOUSE_TYPES[randomIndex(0, 3)];

  if (randomType === 'flat') {
    flatType = 'Квартира';
  } else if (randomType === 'house') {
    flatType = 'Дом';
  } else if (randomType === 'bungalo') {
    flatType = 'Бунгало';
  }
  return flatType;
};

//создаю массив 8 карточек
var generateCards = function() {
  for (var i = 0; i < 8; i++) {
    var locationX = randomIndex(300, 900);
    var locationY = randomIndex(100, 500);

    cards[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: OFFERS_HEADINGS[randomIndex(0, 8)],
        address: locationX  + ', ' +locationY,
        price: randomIndex(1000, 1000000),
        type: getFlatType(randomIndex(0, 3)),
        rooms: randomIndex(1, 6),
        guests: randomIndex(1, 15),
        checkin: CHECKINS[randomIndex(0, 3)],
        checkout: CHECKINS[randomIndex(0, 3)],
        features: randomFeatures(),
        description: '',
        photos: []
      },
      location: {
        x: locationX,
        y: locationY
      }
    }
  }
  return cards;
};

//п.2 У блока .map уберите класс .map--faded
var showMap = document.querySelector('.map');
showMap.classList.remove('map--faded');

//п.3 На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте,
// и заполните их данными из массива. Итоговая разметка метки должна выглядеть следующим образом:
// <button style="left: {{location.x}}px; top: {{location.y}}px;" class="map__pin">
//   <img src="{{author.avatar}}" width="40" height="40" draggable="false">
// </button>

var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var renderMapPins = function (mapPin) {
  var pinElement = mapPinTemplate.cloneNode(true);

  pinElement.style.left = mapPin.location.x + 'px';
  pinElement.style.top = mapPin.location.y + 'px';
  pinElement.querySelector('img').src = mapPin.author.avatar;

  return pinElement;
};

//п.4 Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment
cards = generateCards();

var pins = document.querySelector('.map__pins');

var fragmentPins = document.createDocumentFragment();

cards.forEach(function (item) {
  fragmentPins.appendChild(renderMapPins(item));
});

pins.appendChild(fragmentPins);

//п.5 На основе первого по порядку элемента из сгенерированного массива и шаблона template article.map__card
//создайте DOM-элемент объявления, заполните его данными из объекта и вставьте полученный DOM-элемент в блок
//.map перед блоком .map__filters-container

//получаю содержимое шаблона
var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

//создайте DOM-элемент объявления, заполните его данными из объекта
var renderCards = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('h3').textContent = card.offer.title;
  cardElement.querySelector('small').textContent = card.offer.address;
  cardElement.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
  cardElement.querySelector('h4').textContent = card.offer.type;
  cardElement.querySelector('h4 + p').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.checkins').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  //надо правильно вставить features
  cardElement.querySelector('.popup__features').insertAdjacentHTML('afterbegin', '<li class="features feature--' + card.offer.features + '"></li>');

  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

var fragmentCards = document.createDocumentFragment();

fragmentCards.appendChild(renderCards(cards[0]));
//вставьте полученный DOM-элемент в блок .map
showMap.appendChild(fragmentCards);
