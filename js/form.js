'use strict';

(function () {
  var MAIN_PIN_Y_OFFSET = 16;
  var MAX_Y_COORDS = 500;
  var MIN_Y_COORDS = 100;
  var MIN_SYMBOLS = 30;
  var PRICES = ['1000', '0', '5000', '10000'];
  var noticeForm = document.querySelector('.notice__form');
  var formAddress = noticeForm.querySelector('#address');
  var formTitle = noticeForm.querySelector('#title');
  var formRooms = noticeForm.querySelector('#room_number');
  var apartmentType = noticeForm.querySelector('#type');
  var pricePerNight = noticeForm.querySelector('#price');
  var formCapacity = noticeForm.querySelector('#capacity');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var pricesList = PRICES.slice();

  var syncTimes = function (itemIn, itemOut) {
    itemOut.selectedIndex = itemIn.selectedIndex;
  };

  var syncValueWithMin = function (itemIn, itemOut) {
    itemOut.min = pricesList[itemIn.selectedIndex];
    itemOut.placeholder = pricesList[itemIn.selectedIndex];
  };

  var setFormToDefault = function () {
    formTitle.value = '';
    formTitle.placeholder = 'Милая, уютная квартирка в центре Токио';
    formAddress.value = '';
    formAddress.placeholder = '';
    apartmentType.value = 'flat';
    pricePerNight.value = '5000';
    formRooms.value = '1';
    formCapacity.value = '1';
    timeIn.value = '12:00';
    timeOut.value = '12:00';
    window.backend.removeError();
  };

  var formSubmitHandler = function (evt) {
    window.backend.upload(new FormData(noticeForm), setFormToDefault, window.backend.errorHandler);
    evt.preventDefault();
  };

  var bindFormListeners = function () {

    noticeForm.addEventListener('submit', formSubmitHandler);

    timeIn.addEventListener('change', function () {
      window.synchronizeFields(timeIn, timeOut, syncTimes);
    });

    timeOut.addEventListener('change', function () {
      window.synchronizeFields(timeOut, timeIn, syncTimes);
    });

    apartmentType.addEventListener('change', function () {
      window.synchronizeFields(apartmentType, pricePerNight, syncValueWithMin);
    });

    formRooms.addEventListener('change', function () {
      setGuestOptions();
    });

    formTitle.addEventListener('invalid', titleInvalidHandler);
    formTitle.addEventListener('invalid', inputInvalidEdgeHandler);
    pricePerNight.addEventListener('invalid', priceInvalidHandler);
    formCapacity.addEventListener('invalid', capacityInvalidHandler);
    mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
  };

  var titleInvalidHandler = function () {
    elementInvalidHandler(formTitle, 'tooShort', 'Заголовок должен состоять минимум из 30-ти символов');
  };

  var elementInvalidHandler = function (element, typeCheck, message) {
    if (element.validity[typeCheck]) {
      element.setCustomValidity(message);
      return window.util.getInvalidState(element);
    }
    return window.util.getValidState(element);
  };

  var priceInvalidHandler = function () {
    elementInvalidHandler(pricePerNight, 'valueMissing', 'Пожалуйста, укажите стоимость');
  };

  var capacityInvalidHandler = function () {
    elementInvalidHandler(formCapacity, 'badInput', 'В одной комнате может проживать только один человек');
  };
  // Для Edge
  var inputInvalidEdgeHandler = function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_SYMBOLS) {
      return window.util.getInvalidState(target);
    }
    return window.util.getValidState(target);
  };

  var getMainPinLocation = function () {
    var mainPinlocationX = parseInt(getComputedStyle(mainPin).getPropertyValue('left'), 10);
    var mainPinlocationY = parseInt(getComputedStyle(mainPin).getPropertyValue('top'), 10) - MAIN_PIN_Y_OFFSET;
    return mainPinlocationX + ',' + mainPinlocationY;
  };

  var mainPinMouseDownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientx,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var getMainPinCoordsY = function () {
        var point = MAX_Y_COORDS;
        var coordsY = (mainPin.offsetTop - shift.y);
        var maxCoords = MAX_Y_COORDS + MAIN_PIN_Y_OFFSET;
        var minCoords = MIN_Y_COORDS + MAIN_PIN_Y_OFFSET;

        if (coordsY <= maxCoords && coordsY >= minCoords) {
          point = coordsY;
        }
        return point;
      };

      mainPin.style.top = getMainPinCoordsY() + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      setFormAddress();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var setFormAddress = function () {
    formAddress.value = getMainPinLocation();
    formAddress.placeholder = getMainPinLocation();
  };

  var findSelectedOption = function () {
    var selectedOption = '';
    for (var i = 0; i < formRooms.length; i++) {
      if (formRooms[i].selected) {
        selectedOption = formRooms[i];
      }
    }
    return selectedOption;
  };

  var setGuestOptions = function () {
    var selectedOptionValue = findSelectedOption(formRooms).value;
    var capacityOptionElements = Array.from(formCapacity);
    capacityOptionElements.forEach(function (option) {
      option.disabled = true;
    });
    if (selectedOptionValue === '100') {
      capacityOptionElements[0].disabled = false;
      capacityOptionElements[0].selected = true;
    } else {
      var capacityOptions = capacityOptionElements.slice(1);
      capacityOptions.length = selectedOptionValue;
      capacityOptions.forEach(function (option) {
        option.disabled = false;
      });
    }
  };

  window.setFormAddress = setFormAddress;

  bindFormListeners();
})();
