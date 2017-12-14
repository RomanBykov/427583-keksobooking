'use strict';

(function () {
  var OFFERS_HEADINGS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];
  var HOUSE_TYPES = ['flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PINS_AMOUNT = 8;
  var cards = [];
  var AppartmentTypes = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
  };

  window.getRandomNumber = getRandomNumber;

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

  window.generateCards = generateCards;
})();
