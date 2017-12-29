'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  var debounce = function (someFunction) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(someFunction, DEBOUNCE_INTERVAL);
  };

  window.debounce = debounce;

})();
