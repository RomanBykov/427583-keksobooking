'use strict';

(function () {
  var ENTER_KEY = 13;
  var SPACE_KEY = 32;
  var ESC_KEY = 27;
  var fieldsets = document.querySelector('.notice__form').querySelectorAll('fieldset');
  var mapFiltersArray = document.querySelector('.map').querySelectorAll('.map__filter');

  window.util = {
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEY) {
        action();
      }
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEY) {
        action();
      }
    },
    isSpaceEvent: function (evt, action) {
      if (evt.keyCode === SPACE_KEY) {
        action();
      }
    },
    getInvalidState: function (item) {
      item.style.border = '2px solid #FF0000';
    },
    getValidState: function (item) {
      item.style.border = 'none';
      item.setCustomValidity('');
    },
    setInputsDisabled: function () {
      fieldsets.forEach(function (item, i) {
        fieldsets[i].disabled = true;
      });
      mapFiltersArray.forEach(function (item, j) {
        mapFiltersArray[j].disabled = true;
      });
    },
    setInputsAbled: function () {
      fieldsets.forEach(function (item, i) {
        fieldsets[i].disabled = false;
      });
      mapFiltersArray.forEach(function (item, j) {
        mapFiltersArray[j].disabled = false;
      });
    },
  };
})();
