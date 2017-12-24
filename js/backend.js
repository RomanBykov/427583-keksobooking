'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  // var URL = 'https://js.dump.academy/keksobooking1';
  // var URL = 'api.github.com';
  var SUCCESS_CODE = 200;
  var TIMEOUT = 10000;
  // var TIMEOUT = 1;
  var errorText = document.createElement('div');

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
    errorText.classList.remove('hidden');
    errorText.style.zIndex = '100';
    errorText.style.margin = '0 auto';
    errorText.style.width = '650px';
    errorText.style.textAlign = 'center';
    errorText.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    errorText.style.border = '1px solid tomato';
    errorText.style.position = 'absolute';
    errorText.style.top = '120px';
    errorText.style.left = 0;
    errorText.style.right = 0;
    errorText.style.fontSize = '35px';
    errorText.style.color = 'tomato';
    errorText.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorText);
  };

  var removeError = function () {
    errorText.classList.add('hidden');
    errorText.textContent = '';
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
    errorHandler: showError,
    removeError: removeError
  };

})();
