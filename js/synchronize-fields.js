'use strict';

(function () {
  var synchronizeFields = function (itemIn, itemOut, callback) {
    if (typeof callback === 'function') {
      callback(itemIn, itemOut);
    }
  };

  window.synchronizeFields = synchronizeFields;
})();
