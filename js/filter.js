'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters-container');
  var filterType = mapFilter.querySelector('#housing-type');

  var getPinsArray = function () {
    var allPins = document.querySelectorAll('.map__pin');
    var array = [].map.call(allPins, function (it) {
      return it;
    });
    array.shift();
    return array;
  };

  var filterTypeChangeHandler = function (filter) {
    var pinsArray = getPinsArray();
    window.card.allCards.forEach(function (item, i) {
      if (filter.value === 'any') {
        return pinsArray[i].classList.remove('hidden');
      } else if (item.offer.type !== filter.value) { // не знаю как передать offer.type через переменную, чтобы сделать всю функцию универсальной
        return pinsArray[i].classList.add('hidden');
      }
      return pinsArray[i].classList.remove('hidden');
    });
  };

  filterType.addEventListener('change', function () {
    filterTypeChangeHandler(filterType);
  });

})();
