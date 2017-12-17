'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var formAddress = noticeForm.querySelector('#address');
  var formTitle = noticeForm.querySelector('#title');
  var formRooms = noticeForm.querySelector('#room_number');
  var houseTypes = noticeForm.querySelector('#type');
  var formPrice = noticeForm.querySelector('#price');
  var formCapacity = noticeForm.querySelector('#capacity');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var getChecksChange = function () {
    timeIn.onchange = function () {
      timeOut.selectedIndex = this.selectedIndex;
    };
    timeOut.onchange = function () {
      timeIn.selectedIndex = this.selectedIndex;
    };
  };

  var getChangePrice = function () {
    houseTypes.onchange = function () {
      switch (houseTypes.value) {
        case 'bungalo':
          formPrice.setAttribute('min', '0');
          formPrice.setAttribute('placeholder', '0');
          break;
        case 'house':
          formPrice.setAttribute('min', '5000');
          formPrice.setAttribute('placeholder', '5000');
          break;
        case 'palace':
          formPrice.setAttribute('min', '10000');
          formPrice.setAttribute('placeholder', '10000');
          break;
        case 'flat':
          formPrice.setAttribute('min', '1000');
          formPrice.setAttribute('placeholder', '1000');
          break;
      }
    };
  };

  var getInvalidState = function (item) {
    item.style.border = '2px solid #FF0000';
  };

  var getValidState = function (item) {
    item.style.border = 'none';
    item.setCustomValidity('');
  };

  var titleInvalidHandler = function () {
    if (formTitle.validity.tooShort) {
      formTitle.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
      getInvalidState(formTitle);
    } else {
      getValidState(formTitle);
    }
  };

  var priceInvalidHandler = function () {
    if (formPrice.validity.valueMissing) {
      formPrice.setCustomValidity('Пожалуйста, укажите стоимость');
      getInvalidState(formPrice);
    } else {
      getValidState(formPrice);
    }
  };

  var capacityInvalidHandler = function () {
    if (formCapacity.validity.badInput) {
      formCapacity.setCustomValidity('В одной комнате может проживать только один человек');
      getInvalidState(formCapacity);
    } else {
      getValidState(formCapacity);
    }
  };
  // Для Edge
  var inputInvalidEdgeHandler = function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      getInvalidState(target);
    } else {
      getValidState(target);
    }
  };

  var getMainPinLocation = function () {
    var MAIN_PIN_Y_OFFSET = 16;
    var mainPinlocationX = parseInt(getComputedStyle(mainPin).getPropertyValue('left'), 10);
    var mainPinlocationY = parseInt(getComputedStyle(mainPin).getPropertyValue('top'), 10) - MAIN_PIN_Y_OFFSET;
    return mainPinlocationX + ',' + mainPinlocationY;
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

  var roomsClickHandler = function () {
    formRooms.onchange = setGuestOptions();
  };

  formTitle.addEventListener('invalid', titleInvalidHandler);
  formTitle.addEventListener('invalid', inputInvalidEdgeHandler);
  formPrice.addEventListener('invalid', priceInvalidHandler);
  formCapacity.addEventListener('invalid', capacityInvalidHandler);
  formRooms.addEventListener('click', roomsClickHandler);

  getChecksChange();
  getChangePrice();
  formAddress.value = getMainPinLocation();
  formAddress.placeholder = getMainPinLocation();
})();
