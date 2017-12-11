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
var PINS_AMOUNT = 8;
var cards = [];
var fragmentPins = document.createDocumentFragment();
var fragmentCards = document.createDocumentFragment();
var commonTemplate = document.querySelector('template').content;
var mapPinTemplate = commonTemplate.querySelector('.map__pin');
var mapCardTemplate = commonTemplate.querySelector('.map__card');
var mapCard = mapCardTemplate.cloneNode(true);
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var fieldsets = noticeForm.querySelectorAll('fieldset');
var mapFiltersArray = map.querySelectorAll('.map__filter');
var mapCardClose = mapCard.querySelector('.popup__close');
var activePin = false;
var formAddress = noticeForm.querySelector('#address');
var formTitle = noticeForm.querySelector('#title');
var formRooms = noticeForm.querySelector('#room_number');
var houseTypes = noticeForm.querySelector('#type');
var formPrice = noticeForm.querySelector('#price');
var formCapacity = noticeForm.querySelector('#capacity');
var timeIn = noticeForm.querySelector('#timein');
var timeOut = noticeForm.querySelector('#timeout');

// ФУНКЦИИ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  for (var i = 0; i < PINS_AMOUNT; i++) {
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
// блокирую поля
var getStartState = function () {
  fieldsets.forEach(function (item, i) {
    fieldsets[i].disabled = true;
  });
  mapFiltersArray.forEach(function (item, j) {
    mapFiltersArray[j].disabled = true;
  });
};
// действие при клике на главный пин
var mainPinMouseUpHandler = function () {
  map.classList.remove('map--faded');
  mapPins.appendChild(fragmentPins);
  noticeForm.classList.remove('notice__form--disabled');
  fieldsets.forEach(function (item, i) {
    fieldsets[i].disabled = false;
  });
  mapFiltersArray.forEach(function (item, j) {
    mapFiltersArray[j].disabled = false;
  });
};
// действие при нажатии спэйса или интера на главный пин
var mainPinKeyDownHandler = function (evt) {
  if (evt.keyCode === SPACE_KEY || evt.keyCode === ENTER_KEY) {
    mainPinMouseUpHandler();
  }
};
// отключение класса --active
var removePinActive = function () {
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
};
// закрыть карточку по клику на крест
var cardCloseClickHandler = function () {
  closePopup();
};
// закрыть карточку по эскейпу
var cardEscKeyDownHandler = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    closePopup();
  }
};
// закрыть карточку по интеру на крест
var cardCloseEnterKeyDownHandler = function (evt) {
  if (evt.keyСode === ENTER_KEY) {
    closePopup();
  }
};
// открыть карточку
var openPopup = function () {
  mapCard.classList.remove('hidden');
  document.addEventListener('keydown', cardEscKeyDownHandler);
};
// закрыть карточку
var closePopup = function () {
  mapCard.classList.add('hidden');
  removePinActive();
  activePin = false;
  document.removeEventListener('keydown', cardEscKeyDownHandler);
};
// при клике открыть карточку, связать пин с карточкой по id, добавить --active выбранному пину и снять с другого
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

var getChecksChange = function () {
  timeIn.onchange = function () {
    timeOut.selectedIndex = this.selectedIndex;
  };
  timeOut.onchange = function () {
    timeIn.selectedIndex = this.selectedIndex;
  };
};

var getChangePrice = function () {
  houseTypes.onchange = function () {
    switch (houseTypes.value) {
      case 'bungalo':
        formPrice.setAttribute('min', '0');
        formPrice.setAttribute('placeholder', '0');
        break;
      case 'house':
        formPrice.setAttribute('min', '5000');
        formPrice.setAttribute('placeholder', '5000');
        break;
      case 'palace':
        formPrice.setAttribute('min', '10000');
        formPrice.setAttribute('placeholder', '10000');
        break;
      case 'flat':
        formPrice.setAttribute('min', '1000');
        formPrice.setAttribute('placeholder', '1000');
        break;
    }
  };
};
// сделать перебор в массиве


var getInvalidState = function (item) {
  item.style.border = '2px solid #FF0000';
};

var getValidState = function (item) {
  item.style.border = 'none';
  item.setCustomValidity('');
};

var titleInvalidHandler = function () {
  if (formTitle.validity.tooShort) {
    formTitle.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    getInvalidState(formTitle);
  } else {
    getValidState(formTitle);
  }
};

var priceInvalidHandler = function () {
  if (formPrice.validity.valueMissing) {
    formPrice.setCustomValidity('Пожалуйста, укажите стоимость');
    getInvalidState(formPrice);
  } else {
    getValidState(formPrice);
  }
};

var capacityInvalidHandler = function () {
  if (formCapacity.validity.badInput) {
    formCapacity.setCustomValidity('В одной комнате может проживать только один человек');
    getInvalidState(formCapacity);
  } else {
    getValidState(formCapacity);
  }
};
// Для Edge
var inputInvalidEdgeHandler = function (evt) {
  var target = evt.target;
  if (target.value.length < 30) {
    getInvalidState(target);
  } else {
    getValidState(target);
  }
};

var getMainPinLocation = function () {
  var MAIN_PIN_Y_OFFSET = 16;
  var mainPinlocationX = parseInt(getComputedStyle(mainPin).getPropertyValue('left'), 10);
  var mainPinlocationY = parseInt(getComputedStyle(mainPin).getPropertyValue('top'), 10) - MAIN_PIN_Y_OFFSET;
  return mainPinlocationX + ',' + mainPinlocationY;
};

// ПРОСЛУШКА СОБЫТИЙ/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ловлю клик на главный пин: разблокирую поля, убираю затемнее, отрисовываю пины
mainPin.addEventListener('mouseup', mainPinMouseUpHandler);
// ловлю нажатие на главный пин с клавиатуры
mainPin.addEventListener('keydown', mainPinKeyDownHandler);
// ловлю нажатие на пины
mapPins.addEventListener('click', pinClickHandler);
// При нажатии на элемент .popup__close карточка объявления должна скрываться
mapCardClose.addEventListener('click', cardCloseClickHandler);
// Если диалог открыт и фокус находится на крестике, то нажатие клавиши ENTER приводит к закрытию диалога
mapCardClose.addEventListener('keydown', cardCloseEnterKeyDownHandler);
// Валидация формы
formTitle.addEventListener('invalid', titleInvalidHandler);
formTitle.addEventListener('invalid', inputInvalidEdgeHandler);
formPrice.addEventListener('invalid', priceInvalidHandler);
formCapacity.addEventListener('invalid', capacityInvalidHandler);

// РАБОТА ПРИЛОЖЕНИЯ/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// блокирую поля
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
// связь между чекином и чекаутом
getChecksChange();
// связь между типом жилища минимальной ценой
getChangePrice();
// связь между количеством комнат и вместимостью
// getFormRooms();
// в адрес по умолчанию попадает адрес главного пина
formAddress.value = getMainPinLocation();
formAddress.placeholder = getMainPinLocation();

// бывший рабочий вариант
// var getFormRooms = function () {
//   for (var i = 0; i < formCapacity.length; i++) {
//     if (formCapacity[i].value !== '1') {
//       formCapacity[i].disabled = true;
//     }
//   }
//   formRooms.onchange = function () {
//     switch (formRooms.value) {
//       case '1':
//         formCapacity.value = '1';
//         for (var j = 0; j < formCapacity.length; j++) {
//           if (formCapacity[j].value !== '1') {
//             formCapacity[j].disabled = true;
//           } else {
//             formCapacity[j].disabled = false;
//           }
//         }
//         break;
//       case '2':
//         formCapacity.value = '2';
//         for (var k = 0; k < formCapacity.length; k++) {
//           if (formCapacity[k].value === '1' || formCapacity[k].value === '2') {
//             formCapacity[k].disabled = false;
//           } else {
//             formCapacity[k].disabled = true;
//           }
//         }
//         break;
//       case '3':
//         formCapacity.value = '3';
//         for (var l = 0; l < formCapacity.length; l++) {
//           if (formCapacity[l].value === '0') {
//             formCapacity[l].disabled = true;
//           } else {
//             formCapacity[l].disabled = false;
//           }
//         }
//         break;
//       case '100':
//         formCapacity.value = '0';
//         for (var m = 0; m < formCapacity.length; m++) {
//           if (formCapacity[m].value === '0') {
//             formCapacity[m].disabled = false;
//           } else {
//             formCapacity[m].disabled = true;
//           }
//         }
//         break;
//     }
//   };
// };

// ищу выбранный элемент списка количества комнат
var findSelectedOption = function () {
  var selectedOption = '';
  for (var i = 0; i < formRooms.length; i++) {
    if (formRooms[i].selected) {
      selectedOption = formRooms[i];
    }
  }
  return selectedOption;
};


var setGuestOptions = function () {
  var selectedOptionValue = findSelectedOption(formRooms).value; // здесь value выбранного элемента списка количества комнат по умолчанию
  var capacityOptionElements = Array.from(formCapacity); // здесь массивоподобный список вместимостей превращается в настоящий массив
  capacityOptionElements.forEach(function (option) { // здесь всем элементам списка вместимостей присваивается disabled
    option.disabled = true;
  });
  if (selectedOptionValue === '100') { // дальше, если value выбранного эл-та списка кол-ва комнат = 100
    capacityOptionElements[3].disabled = false; // то последний элемент списка вместимостей разблокируется
    capacityOptionElements[3].selected = true; // и становится выбранным
  } else { // иначе
    var capacityOptions = capacityOptionElements.slice(1); // копия списка вместимостей, которая равна списку вместимостей, обрезанному на 2-м элементе
    capacityOptions.length = +selectedOptionValue; // длина нового списка вместимостей увеличивается на ??? на valye выбранного элемента? не понимаю
    capacityOptions.forEach(function (option) { // здесь снова всем элементам, только уже нового списка вместимостей присваивается disabled
      option.disabled = false;
    });
    capacityOptions[0].selected = true; // а в это время первый элемент нового списка становится выбранным
  }
};

var getFormRooms = function () {
  formRooms.onchange = setGuestOptions();
};

// getFormRooms();

formRooms.addEventListener('click', getFormRooms);

// Пример от Игоря
//   var selectedOptionValue = findSelectedOption(roomNumberSelectElement).value;
//      capacityOptionElements.forEach(function (option) {
//        option.disabled = true;
//      });
//      if (selectedOptionValue === '100') {
//        capacitySelectElement.options[3].disabled = false;
//        capacitySelectElement.options[3].selected = true;
//      } else {
//        var capacityOptions = capacityOptionElements.slice(1);
//        capacityOptions.length = +selectedOptionValue;
//        capacityOptions.forEach(function (option) {
//          option.disabled = false;
//        });
//        capacityOptions[0].selected = true;
//      }
//    };
