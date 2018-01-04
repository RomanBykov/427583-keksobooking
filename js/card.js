'use strict';

(function () {
  var mapCardTemplate = window.pin.template.querySelector('.map__card');
  var cardTemplate = mapCardTemplate.cloneNode(true);

  var getOfferItem = function (arr, offerItem, itemClass) {
    arr.forEach(function (item) {
      var liElement = document.createElement('li');
      if (itemClass) {
        liElement.classList.add('feature');
        liElement.classList.add(itemClass + item);
      } else {
        var photo = document.createElement('img');
        photo.src = item;
        liElement.appendChild(photo);
      }
      offerItem.appendChild(liElement);
    });
  };

  var AppartmentTypes = {
    flat: 'Квартира',
    bungalo: 'Лачуга',
    house: 'Дом',
    palace: 'Дворец'
  };

  var fillCards = function (card) {
    var cardTemplatePictures = cardTemplate.querySelector('.popup__pictures');
    var cardTemplateFeatures = cardTemplate.querySelector('.popup__features');
    cardTemplate.querySelector('.popup__avatar').src = card.author.avatar;
    cardTemplate.querySelector('h3').textContent = card.offer.title;
    cardTemplate.querySelector('small').textContent = card.offer.address;
    cardTemplate.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
    cardTemplate.querySelector('h4').textContent = AppartmentTypes[card.offer.type];
    cardTemplate.querySelector('h4 + p').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
    cardTemplate.querySelector('.popup__checkins').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardTemplate.querySelector('.popup__description').textContent = card.offer.description;
    cardTemplateFeatures.textContent = '';
    getOfferItem(card.offer.features, cardTemplateFeatures, 'feature--');
    cardTemplate.appendChild(cardTemplateFeatures);
    cardTemplatePictures.textContent = '';
    getOfferItem(card.offer.photos, cardTemplatePictures);
    cardTemplate.appendChild(cardTemplatePictures);
    return cardTemplate;
  };

  var hideMapCard = function () {
    cardTemplate.classList.add('hidden');
  };

  window.card = {
    fillCards: fillCards,
    hideMapCard: hideMapCard,
    mapCard: cardTemplate,
    allCards: [],
    filteredCards: []
  };

})();
