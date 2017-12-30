'use strict';

(function () {
  var ENTER_KEY = 13;
  var SPACE_KEY = 32;
  var ESC_KEY = 27;
  var fieldsets = document.querySelector('.notice__form').querySelectorAll('fieldset');
  var filters = document.querySelector('.map').querySelectorAll('.map__filter');

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
      fieldsets.forEach(function (item) {
        item.disabled = true;
      });
      filters.forEach(function (item) {
        item.disabled = true;
      });
    },
    setInputsAbled: function () {
      fieldsets.forEach(function (item) {
        item.disabled = false;
      });
      filters.forEach(function (item) {
        item.disabled = false;
      });
    },
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max - min));
    }
  };

})();
