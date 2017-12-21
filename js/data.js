'use strict';

(function () {
  // var OFFERS_HEADINGS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  // 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
  // 'Неуютное бунгало по колено в воде'];
  // var HOUSE_TYPES = ['flat', 'house', 'bungalo', 'palace'];
  // var CHECKINS = ['12:00', '13:00', '14:00'];
  // var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  // var PINS_AMOUNT = 8;
  var PRICES = ['1000', '0', '5000', '10000'];

  // var apartmentTypes = {
  //   flat: 'Квартира',
  //   house: 'Дом',
  //   bungalo: 'Бунгало',
  //   palace: 'Дворец'
  // };

  // var features = function () {
  //   return window.util.shuffle(FEATURES).slice(0, window.util.getRandomNumber(1, FEATURES.length));
  // };

  // var getApartmentTypes = function () {
  //   var randomType = HOUSE_TYPES[window.util.getRandomNumber(0, 4)];
  //   return apartmentTypes[randomType];
  // };

  // var generateCards = function () {
  //   for (var i = 0; i < PINS_AMOUNT; i++) {
  //     var locationX = window.util.getRandomNumber(300, 900);
  //     var locationY = window.util.getRandomNumber(100, 500);
  //     cards[i] = {
  //       author: {
  //         avatar: 'img/avatars/user0' + (i + 1) + '.png',
  //         number: -1 + (i + 1)
  //       },
  //       offer: {
  //         title: OFFERS_HEADINGS[window.util.getRandomNumber(0, 8)],
  //         address: locationX + ', ' + locationY,
  //         price: window.util.getRandomNumber(1000, 1000000),
  //         type: getApartmentTypes(),
  //         rooms: window.util.getRandomNumber(1, 6),
  //         guests: window.util.getRandomNumber(1, 15),
  //         checkin: CHECKINS[window.util.getRandomNumber(0, 3)],
  //         checkout: CHECKINS[window.util.getRandomNumber(0, 3)],
  //         features: features(),
  //         description: '',
  //         photos: []
  //       },
  //       location: {
  //         x: locationX,
  //         y: locationY
  //       }
  //     };
  //   }
  //   return cards;
  // };

  // var cards = [];
  // window.backend.load(function (cardsData) {
  //   debugger;
  //   cards = cardsData.slice();
  // });

  window.data = {
    // allCards: cards,
    prices: PRICES.slice()
  };

})();
