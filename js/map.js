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

var activePin = false;

// ФУНКЦИИ

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
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
        number: -1 + (i + 1)
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
  mapPin.setAttribute('id', pin.author.number);

  return mapPin;
};

// п.5 На основе первого по порядку элемента из сгенерированного массива и шаблона template article.map__card
// создайте DOM-элемент объявления, заполните его данными из объекта и вставьте полученный DOM-элемент в блок
// .map перед блоком .map__filters-container

// заполните его данными из объекта
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

var getStartState = function () {
  map.classList.add('map--faded');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }
  for (var j = 0; j < mapFiltersArray.length; j++) {
    mapFiltersArray[j].disabled = true;
  }
};

var mainPinMouseUpHandler = function () {
  map.classList.remove('map--faded');
  mapPins.appendChild(fragmentPins);
  noticeForm.classList.remove('notice__form--disabled');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = false;
  }
  for (var j = 0; j < mapFiltersArray.length; j++) {
    mapFiltersArray[j].disabled = false;
  }
};

var removePinActive = function () {
  if (activePin !== false) {
    activePin.classList.remove('map__pin--active');
  }
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

var cardEscKeyDownHandler = function (evt) {
  if (evt.keyСode === ESC_KEY) {
    closePopup();
  }
};

var cardCloseClickHandler = function () {
  closePopup();
};

var cardCloseEscKeyDownHandler = function (evt) {
  if (evt.keyСode === ENTER_KEY) {
    closePopup();
  }
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

// СЛУШАТЕЛИ СОБЫТИЙ

// ловлю нажатие на главный пин: разблокирую поля, убираю затемнее, отрисовываю пины
mainPin.addEventListener('mouseup', mainPinMouseUpHandler);

// не понимаю почему на работает, возможно ловлю не на том элементе
// пока не заработает, не буду в отдельную функцию выводить
// mainPin.addEventListener('keydown', function (evt) {
//   if (evt.keyСode === SPACE_KEY || evt.keyСode === ENTER_KEY) {
//     mainPinMouseUpHandler();
//   }
// });

// ловлю нажатие на один из пинов
mapPins.addEventListener('click', pinClickHandler);

// При нажатии на элемент .popup__close карточка объявления должна скрываться
mapCardClose.addEventListener('click', cardCloseClickHandler);

// Если диалог открыт и фокус находится на крестике, то нажатие клавиши ENTER приводит к закрытию диалога
mapCardClose.addEventListener('keydown', cardCloseEscKeyDownHandler);

// РАБОТА ПРИЛОЖЕНИЯ

// блокирую поля и затемняю экран
getStartState();

// генерирую карточки
cards = generateCards();

// оборачиваю в DOM-элемент пины
cards.forEach(function (item) {
  fragmentPins.appendChild(renderMapPins(item));
});

// оборачиваю в другой DOM-элемент карточки
fragmentCards.appendChild(fillCards(cards[getRandomNumber(0, 8)]));

// вставляю полученный DOM-элемент с карточками в блок .map
map.appendChild(fragmentCards);

// Первым шагом отключите показ по умолчанию первой карточки из набора объявлений
mapCard.classList.add('hidden');
