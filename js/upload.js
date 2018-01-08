'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var usersAvatar = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.notice__preview img');
  var usersImage = document.querySelector('#images');
  var imagePreview = document.querySelector('.form__photo-container');

  var addFile = function (element, cb) {
    var fileName = element.files[0].name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      cb();
    }
  };

  var displayImageViaReader = function (evt) {
    var imageElement = document.createElement('img');
    imageElement.classList.add('upload__photo');
    imagePreview.appendChild(imageElement);
    imageElement.src = evt.target.result;
  };

  var displayAvatarViaReader = function (evt) {
    avatarPreview.src = evt.target.result;
  };

  var readFile = function (itemLoad) {
    var file = itemLoad.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    return reader;
  };

  var loadAvatar = function () {
    var reader = readFile(usersAvatar);
    reader.addEventListener('load', displayAvatarViaReader);
  };

  var loadPhoto = function () {
    var reader = readFile(usersImage);
    reader.addEventListener('load', displayImageViaReader);
  };

  var avatarChangeHandler = function () {
    addFile(usersAvatar, loadAvatar);
  };

  var imageChangeHandler = function () {
    addFile(usersImage, loadPhoto);
  };

  window.upload = {
    usersAvatar: usersAvatar,
    avatarChangeHandler: avatarChangeHandler,
    usersImage: usersImage,
    imageChangeHandler: imageChangeHandler
  };

})();
