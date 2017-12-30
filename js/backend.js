'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var SUCCESS_CODE = 200;
  var TIMEOUT = 10000;

  var makeRequest = function (succesHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        succesHandler(xhr.response);
      } else {
        errorHandler('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
    return xhr;
  };

  var load = function (succesHandler, errorHandler) {
    var xhr = makeRequest(succesHandler, errorHandler);
    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var upload = function (data, succesHandler, errorHandler) {
    var xhr = makeRequest(succesHandler, errorHandler);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };

})();
