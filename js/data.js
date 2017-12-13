'use strict';

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
var AppartmentTypes = {
flat: 'Квартира',
house: 'Дом',
bungalo: 'Бунгало'
};

