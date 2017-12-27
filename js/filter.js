'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters-container');
  var filterType = mapFilter.querySelector('#housing-type');
  var arr = [];
  var pinsArr = [];

  filterType.addEventListener('change', function () {
    pinsArr = document.querySelectorAll('.map__pin');
    arr = [].map.call(pinsArr, function (it) {
      return it;
    });
    arr.shift();
    console.log(arr);
    window.card.allCards.forEach(function (item, i) {
      if (item.offer.type !== 'flat') {
        return arr[i].classList.add('hidden');
      }
      return arr[i].classList.remove('hidden');
    });
  });

})();
