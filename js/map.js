'use strict';

// п.1 Создайте массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалеку.
var OFFERS_HEADINGS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var HOUSE_TYPES = ['flat', 'house', 'bungalo'];

var CHECKINS = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var ESC_KEY = 27;

var ENTER_KEY = 13;

var SPACE_KEY = 32;

var cards = [];

var pinsAmount = 8;

var fragmentPins = document.createDocumentFragment();

var fragmentCards = document.createDocumentFragment();

var commonTemplate = document.querySelector('template');

var mapPinTemplate = commonTemplate.content.querySelector('.map__pin');

var mapCardTemplate = commonTemplate.content.querySelector('.map__card');

var mapCard = mapCardTemplate.cloneNode(true);

var map = document.querySelector('.map');

var mapPins = map.querySelector('.map__pins');

var mainPin = map.querySelector('.map__pin--main');

var noticeForm = document.querySelector('.notice__form');

var fieldsets = noticeForm.querySelectorAll('fieldset');

var mapFiltersArray = map.querySelectorAll('.map__filter');

var mapCardClose = mapCard.querySelector('.popup__close');

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

// п.3 На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте,
// и заполните их данными из массива. Итоговая разметка метки должна выглядеть следующим образом:
// <button style="left: {{location.x}}px; top: {{location.y}}px;" class="map__pin">
//   <img src="{{author.avatar}}" width="40" height="40" draggable="false">
// </button>

var renderMapPins = function (pin) {
  var mapPin = mapPinTemplate.cloneNode(true);

  mapPin.style.left = pin.location.x + 'px';
  mapPin.style.top = pin.location.y + 'px';
  mapPin.querySelector('img').src = pin.author.avatar;

  return mapPin;
};

// п.4 Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment
cards = generateCards();

cards.forEach(function (item) {
  fragmentPins.appendChild(renderMapPins(item));
});

// п.5 На основе первого по порядку элемента из сгенерированного массива и шаблона template article.map__card
// создайте DOM-элемент объявления, заполните его данными из объекта и вставьте полученный DOM-элемент в блок
// .map перед блоком .map__filters-container


// заполните его данными из объекта
var renderCards = function (card) {
  mapCard.querySelector('h3').textContent = card.offer.title;
  mapCard.querySelector('small').textContent = card.offer.address;
  mapCard.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
  mapCard.querySelector('h4').textContent = card.offer.type;
  mapCard.querySelector('h4 + p').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
  mapCard.querySelector('.popup__checkins').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  mapCard.querySelector('.popup__features').innerHTML = '';
  mapCard.querySelector('.popup__features').insertAdjacentHTML('afterbegin', card.offer.features.map(getFeatures).join(' '));
  mapCard.querySelector('.popup__description').textContent = card.offer.description;
  mapCard.querySelector('.popup__avatar').src = card.author.avatar;

  return mapCard;
};

fragmentCards.appendChild(renderCards(cards[getRandomNumber(0, 8)]));

// вставьте полученный DOM-элемент в блок .map
map.appendChild(fragmentCards);

// В момент открытия, страница должна находиться в следующем состоянии: карта затемнена (добавлен класс map--faded) и
// форма неактивна (добавлен класс notice__form--disabled и все поля формы недоступны, disabled)

var getStartState = function () {
  map.classList.add('map--faded');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }
  for (var i = 0; i < mapFiltersArray.length; i++) {
    mapFiltersArray[i].disabled = true;
  }
};

getStartState();

// После того, как на блоке map__pin--main произойдет событие mouseup, форма и карта должны активироваться:
// У карты убрать класс map--faded
// Показать на карте метки похожих объявлений, созданные в задании к прошлому разделу
// У формы убрать класс notice__form--disabled и сделать все поля формы активными

var openMainPin = function () {
  map.classList.remove('map--faded');
  mapPins.appendChild(fragmentPins);
  noticeForm.classList.remove('notice__form--disabled');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = false;
  }
  for (var i = 0; i < mapFiltersArray.length; i++) {
    mapFiltersArray[i].disabled = false;
  }
};

mainPin.addEventListener('mouseup', openMainPin);

// Первым шагом отключите показ по умолчанию первой карточки из набора объявлений
mapCard.classList.add('hidden');

// Хотел сделать открытие по спейсу, но почему-то не работает
// mainPin.addEventListener('keydown', function(evt) {
//   if (evt.keycode === SPACE_KEY) {
//     openMainPin();
//   }
// });

var popupEscPressHandler = function (evt) {
  if (evt.keycode === ESC_KEY) {
    closePopup();
  }
};

// Если пин объявления в фокусе .map__pin, то диалог с подробностями должен показываться по нажатию кнопки ENTER
// Когда диалог открыт, то клавиша ESC должна закрывать диалог и деактивировать элемент .map__pin, который был помечен как активный
var openPopup = function () {
  mapCard.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler)
};

var closePopup = function () {
  mapCard.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
};

//При нажатии на элемент .popup__close карточка объявления должна скрываться
mapCardClose.addEventListener('click', function() {
  closePopup();
});

// Если диалог открыт и фокус находится на крестике, то нажатие клавиши ENTER приводит к закрытию диалога
mapCardClose.addEventListener('keydown', function(evt) {
  if (evt.keycode === ENTER_KEY) {
    closePopup();
  }
});






