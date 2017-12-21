'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  window.backend = {
    load: function (onSuccess) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', URL_LOAD);
      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
      });
      xhr.send();
    },

  };
})();
