'use strict';

(function () {
  var errorText = document.createElement('div');

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

  window.error = {
    errorHandler: showError,
    removeError: removeError
  };

})();
