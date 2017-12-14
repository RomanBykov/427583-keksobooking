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

  var titleInvalidHandler = function () {
    if (formTitle.validity.tooShort) {
      formTitle.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
      window.util.getInvalidState(formTitle);
    } else {
      window.util.getValidState(formTitle);
    }
  };

  var priceInvalidHandler = function () {
    if (formPrice.validity.valueMissing) {
      formPrice.setCustomValidity('Пожалуйста, укажите стоимость');
      window.util.getInvalidState(formPrice);
    } else {
      window.util.getValidState(formPrice);
    }
  };

  var capacityInvalidHandler = function () {
    if (formCapacity.validity.badInput) {
      formCapacity.setCustomValidity('В одной комнате может проживать только один человек');
      window.util.getInvalidState(formCapacity);
    } else {
      window.util.getValidState(formCapacity);
    }
  };
  // Для Edge
  var inputInvalidEdgeHandler = function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      window.util.getInvalidState(target);
    } else {
      window.util.getValidState(target);
    }
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

  var getMainPinLocation = function () {
    var MAIN_PIN_Y_OFFSET = 16;
    var mainPinlocationX = parseInt(getComputedStyle(mainPin).getPropertyValue('left'), 10);
    var mainPinlocationY = parseInt(getComputedStyle(mainPin).getPropertyValue('top'), 10) - MAIN_PIN_Y_OFFSET;
    return mainPinlocationX + ',' + mainPinlocationY;
  };

  var roomsClickHandler = function () {
    formRooms.onchange = setGuestOptions();
  };

  var setGuestOptions = function () {
    // selectedOptionValue = value выбранного элемента списка количества комнат по умолчанию
    var selectedOptionValue = findSelectedOption(formRooms).value;
    // здесь массивоподобный список вместимостей превращается в настоящий массив
    var capacityOptionElements = Array.from(formCapacity);
    // здесь всем элементам списка вместимостей присваивается disabled
    capacityOptionElements.forEach(function (option) {
      option.disabled = true;
    });
    // дальше, ЕСЛИ value выбранного эл-та списка кол-ва комнат = 100
    if (selectedOptionValue === '100') {
      // то первый элемент массива вместимостей разблокируется
      capacityOptionElements[0].disabled = false;
      // и он же становится выбранным
      capacityOptionElements[0].selected = true;
      // ИНАЧЕ
    } else {
      // копия массива вместимостей, которая = массиву вместимостей, обрезанному на 1-м эл-те с начала
      // т.е. capacityOptions =  3-м элементам массива, начиная с 2-го
      // slice: указан только begin, поэтому новый массив начинается с 2-го эл-та и т.к. end не указан, то дальше донорский массив копируется до конца
      var capacityOptions = capacityOptionElements.slice(1);
      // длина нового массива = value выбранного эл-та; отсекается с конца, т.е., например, если selected = '2', то capacityOptions = [1, 2]
      // [0] отрезали в slice, а [3] отрезали сейчас
      capacityOptions.length = selectedOptionValue;
      // здесь всем эл-там нового массива снимается disabled
      capacityOptions.forEach(function (option) {
        option.disabled = false;
      });
    }
  };

  formAddress.value = getMainPinLocation();
  formAddress.placeholder = getMainPinLocation();

  formTitle.addEventListener('invalid', titleInvalidHandler);
  formTitle.addEventListener('invalid', inputInvalidEdgeHandler);
  formPrice.addEventListener('invalid', priceInvalidHandler);
  formCapacity.addEventListener('invalid', capacityInvalidHandler);
  formRooms.addEventListener('click', roomsClickHandler);

  // связь между чекином и чекаутом
  getChecksChange();
  // связь между типом жилища минимальной ценой
  getChangePrice();

})();
