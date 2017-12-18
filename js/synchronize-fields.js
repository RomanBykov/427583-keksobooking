'use strict';

(function () {
  var synchronizeFields = function (itemIn, itemOut, arrIn, arrOut, callback) {
    if (typeof callback === 'function') {
      callback();
    }
  };

  window.synchronizeFields = synchronizeFields;
})();
