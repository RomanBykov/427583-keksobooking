'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters-container');
  var filterType = mapFilter.querySelector('#housing-type');
  var cardsPseudoArr = map.querySelectorAll('.map__card');
  var arr = [].map.call(cardsPseudoArr, function (it) {
    return it.h4;
  });
  console.log(arr);
})();
