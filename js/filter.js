'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters-container');
  var featuresFilters = mapFilters.querySelectorAll('[name="features"]');
  var typeFilter = mapFilters.querySelector('#housing-type');
  var priceFilter = mapFilters.querySelector('#housing-price');
  var roomsFilter = mapFilters.querySelector('#housing-rooms');
  var guestsFilter = mapFilters.querySelector('#housing-guests');
  var priceRange = {
    MIN: 10000,
    MAX: 50000
  };

  var filterValue = function (field, filter) {
    return function (data) {
      var condition = (data.offer[field]).toString(10) === filter.value;
      return filter.value === 'any' ? true : condition;
    };
  };

  var isTypeFit = filterValue('type', typeFilter);
  var isRoomsFit = filterValue('rooms', roomsFilter);
  var isGuestsFit = filterValue('guests', guestsFilter);

  var isPriceFit = function (data) {
    var condition = {
      high: data.offer.price >= priceRange.MAX,
      middle: data.offer.price >= priceRange.MIN && data.offer.price < priceRange.MAX,
      low: data.offer.price < priceRange.MIN
    };
    return priceFilter.value === 'any' ? true : condition[priceFilter.value];
  };

  var isFeaturesFit = function (data) {
    var checkedFeatures = Array.prototype.slice.call(featuresFilters, 0).filter(function (feature) {
      return feature.checked;
    });
    return checkedFeatures.every(function (feature) {
      return data.offer.features.indexOf(feature.value) >= 0;
    });
  };
  var filters = [isTypeFit, isRoomsFit, isGuestsFit, isPriceFit, isFeaturesFit];

  var filterData = function (data) {
    var filterCallback = function (dataItem) {
      return filters.every(function (filterCheck) {
        return filterCheck(dataItem);
      });
    };
    return data.slice().filter(filterCallback);
  };

  window.filterData = filterData;

})();
