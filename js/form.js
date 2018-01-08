'use strict';

(function () {
  var MAX_ROOMS = 100;
  var MAIN_PIN_Y_OFFSET = 16;
  var MAX_Y_COORDS = 500;
  var MIN_Y_COORDS = 100;
  var MIN_SYMBOLS = 30;
  var PRICES = ['1000', '0', '5000', '10000'];
  var DEFAULT_TITLE = 'Милая, уютная квартирка в центре Токио';
  var DEFAULT_EMPTYSPACE = '';
  var DEFAULT_PRICE = '1000';
  var DEFAULT_ROOMS = '1';
  var DEFAULT_CHECKS = '12:00';
  var NOT_FOR_GUESTS_OPTION = 0;
  var FLAT_VALUE = 'flat';
  var BUNGALO_VALUE = 'bungalo';
  var HOUSE_VALUE = 'house';
  var PALACE_VALUE = 'palace';
  var MUFFIN_AVATAR = 'img/muffin.png';
  var noticeForm = document.querySelector('.notice__form');
  var formAddress = noticeForm.querySelector('#address');
  var formTitle = noticeForm.querySelector('#title');
  var formRooms = noticeForm.querySelector('#room_number');
  var apartmentType = noticeForm.querySelector('#type');
  var pricePerNight = noticeForm.querySelector('#price');
  var formCapacity = noticeForm.querySelector('#capacity');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var formAvatar = noticeForm.querySelector('.notice__preview img');
  var mainPin = window.showCard.map.querySelector('.map__pin--main');
  var pricesList = PRICES.slice();
  var capacityOptionElements = Array.from(formCapacity);

  var syncTimes = function (itemIn, itemOut) {
    itemOut.selectedIndex = itemIn.selectedIndex;
  };

  var syncValueWithMin = function (itemIn, itemOut) {
    itemOut.min = pricesList[itemIn.selectedIndex];
    itemOut.placeholder = pricesList[itemIn.selectedIndex];
  };

  var setFormToDefault = function () {
    formTitle.value = DEFAULT_EMPTYSPACE;
    formTitle.placeholder = DEFAULT_TITLE;
    formAddress.value = getMainPinLocation();
    formAddress.placeholder = getMainPinLocation();
    apartmentType.value = FLAT_VALUE;
    pricePerNight.value = DEFAULT_PRICE;
    pricePerNight.min = DEFAULT_PRICE;
    formRooms.value = DEFAULT_ROOMS;
    formCapacity.placeholder = DEFAULT_ROOMS;
    formCapacity.value = DEFAULT_ROOMS;
    timeIn.value = DEFAULT_CHECKS;
    timeOut.value = DEFAULT_CHECKS;
    capacityOptionElements.forEach(function (item) {
      if (!item.selected) {
        item.disabled = true;
      }
    });
    var uploadPhotos = noticeForm.querySelectorAll('.upload__photo');
    if (uploadPhotos) {
      for (var k = 0; k < uploadPhotos.length; k++) {
        uploadPhotos[k].remove();
      }
    }
    formAvatar.src = MUFFIN_AVATAR;
    window.error.removeError();
  };

  var formSubmitHandler = function (evt) {
    window.backend.upload(new FormData(noticeForm), setFormToDefault, window.error.errorHandler);
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
    formRooms.addEventListener('change', setGuestOptions);
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
    if (pricePerNight.validity.rangeUnderflow && apartmentType.value === FLAT_VALUE) {
      pricePerNight.setCustomValidity('Для квартиры минимальная цена за ночь 1000 рублей');
      return window.util.getInvalidState(pricePerNight);
    } else if (pricePerNight.validity.rangeUnderflow && apartmentType.value === BUNGALO_VALUE) {
      pricePerNight.setCustomValidity('Для лачуги минимальная цена за ночь 0 рублей');
      return window.util.getInvalidState(pricePerNight);
    } else if (pricePerNight.validity.rangeUnderflow && apartmentType.value === HOUSE_VALUE) {
      pricePerNight.setCustomValidity('Для дома минимальная цена за ночь 5000 рублей');
      return window.util.getInvalidState(pricePerNight);
    } else if (pricePerNight.validity.rangeUnderflow && apartmentType.value === PALACE_VALUE) {
      pricePerNight.setCustomValidity('Для дворца минимальная цена за ночь 10000 рублей');
      return window.util.getInvalidState(pricePerNight);
    }
    return window.util.getValidState(pricePerNight);
  };

  var capacityInvalidHandler = function () {
    elementInvalidHandler(formCapacity, 'badInput', 'В одной комнате может проживать только один человек');
  };

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
    return 'x: ' + mainPinlocationX + ', y: ' + mainPinlocationY;
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

  var setOptionDisabled = function (optionsArray, booleanValue) {
    optionsArray.forEach(function (option) {
      option.disabled = booleanValue;
    });
  };

  var setGuestOptions = function () {
    var selectedOptionValue = parseInt(formRooms.value, 10);
    setOptionDisabled(capacityOptionElements, true);
    if (selectedOptionValue === MAX_ROOMS) {
      capacityOptionElements[NOT_FOR_GUESTS_OPTION].disabled = false;
      capacityOptionElements[NOT_FOR_GUESTS_OPTION].selected = true;
    } else {
      var capacityOptions = capacityOptionElements.slice(1);
      capacityOptions.length = selectedOptionValue;
      setOptionDisabled(capacityOptions, false);
      capacityOptions.forEach(function (option) {
        option.selected = true;
      });
    }
  };

  bindFormListeners();

  window.form = {
    setFormAddress: setFormAddress,
    mainPin: mainPin,
    noticeForm: noticeForm,
    setFormToDefault: setFormToDefault
  };

})();
