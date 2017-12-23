'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  // var URL = 'https://js.dump.academy/keksobooking1';
  // var URL = 'api.github.com';
  var SUCCESS_CODE = 200;
  var TIMEOUT = 10000;
  // var TIMEOUT = 1;

  var makeRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  var showError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; width: 650px; text-align: center; color: tomato; background-color: rgba(0, 0, 0, 0.2); border: 1px solid tomato';
    node.style.position = 'absolute';
    node.style.top = '120px';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '35px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = makeRequest(onSuccess, onError);
      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    upload: function (data, onSuccess, onError) {
      var xhr = makeRequest(onSuccess, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    },
    errorHandler: showError
  };

})();
