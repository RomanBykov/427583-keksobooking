'use strict';
var cards = [];
var fragmentPins = document.createDocumentFragment();
var fragmentCards = document.createDocumentFragment();
var commonTemplate = document.querySelector('template').content;
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
// ФУНКЦИИ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// блокирую поля
(function () {
  fieldsets.forEach(function (item, i) {
    fieldsets[i].disabled = true;
  });
  mapFiltersArray.forEach(function (item, j) {
    mapFiltersArray[j].disabled = true;
  });
})();

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
  window.util.isEnterEvent(evt, mainPinMouseUpHandler);
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
  window.util.isEscEvent(evt, closePopup);
};
// закрыть карточку по интеру на крест
var cardCloseEnterKeyDownHandler = function (evt) {
  window.util.isEnterEvent(evt, closePopup);
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
        window.fillCards(cards[targetId]);
        openPopup();
      }
      return;
    }
    target = target.parentNode;
  }
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

// РАБОТА ПРИЛОЖЕНИЯ/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// генерирую карточки
cards = window.generateCards();
// оборачиваю в DOM-элемент пины
cards.forEach(function (item) {
  fragmentPins.appendChild(window.renderMapPins(item));
});
// оборачиваю в другой DOM-элемент карточки
fragmentCards.appendChild(window.fillCards(cards[window.getRandomNumber(0, 8)]));
// вставляю полученный DOM-элемент с карточками в блок .map
map.appendChild(fragmentCards);
// Первым шагом отключите показ по умолчанию первой карточки из набора объявлений
mapCard.classList.add('hidden');
