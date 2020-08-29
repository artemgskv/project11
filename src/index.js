
import "./pages/index.css";

import { Api } from './script/Api.js';
import { FormValidator } from './script/FormValidator.js';
import { Card } from './script/Card.js';
import { CardList } from './script/CardList.js';
import { UserInfo } from './script/UserInfo.js';
import { Popup } from './script/Popup.js';
import { ImagePopup } from './script/ImagePopup.js';

'use strict';


(function () {

const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка'
}

// Подключение API
const api = new Api({
  url: (process.env.NODE_ENV === 'production' ? "https://nomoreparties.co/cohort11" : "http://nomoreparties.co/cohort11"),
  headers: {
    authorization: 'ec1d136c-d721-4c81-8b5a-40509bdd3899',
    'Content-Type': 'application/json'
  }
});


const profilePopup = new Popup(document.getElementById('profile-popup'), document.getElementById('profile-close-button'));
const profileEditButton = document.getElementById('profile-edit-button');
const profile = new UserInfo(document.querySelector('.user-info__name'), document.querySelector('.user-info__job'));
const profileForm = document.forms.profile;
const profileUsername = profileForm.elements.username;
const profileJob = profileForm.elements.bio;
const profileValidation = new FormValidator(profileForm, errorMessages);





// Попап мест
const placesPopup = new Popup(document.getElementById('places-popup'), document.getElementById('places-close-button'));
const placesAddButton = document.getElementById('places-add-button');
const placesForm = document.forms.places;
const placesTitle = placesForm.elements.name;
const placesLink = placesForm.elements.link;
const placesList = document.querySelector('.places-list')
const imagePopupBackground = document.getElementById('image-popup-background');
const imagePopupCreate = (item) => scaleImage.openImage(item);
const createCard = (...arg) => new Card(...arg, imagePopupCreate, template).create();
const scaleImage = new ImagePopup(document.getElementById('image-popup'), document.getElementById('image-close-button'), imagePopupBackground);
const places = new CardList(placesList, createCard, api);

const template = document.getElementById('card-template').content.querySelector('.place-card');
const placesValidation = new FormValidator(placesForm, errorMessages);

api.getUserData()
  .then(res => {
    profile.setUserInfo(res);
    profile.updateUserInfo();
  })
  .catch((err) => {
    alert('ERROR! ' + err);
  });

  api.getData()
  .then(res => {
    places.render(res);
  })
  .catch((err) => {
    alert('Упс! ' + err);
  });





/* Слушатели событий */

// Слушатель кнопки открыти попапа профиля
profileEditButton.addEventListener('click', () => {
  profileValidation.validityReset();
  profileUsername.value = profile._userElement.textContent;
  profileJob.value = profile._jobElement.textContent;
  profilePopup.open();
});

// Слушатель кнопки открыти попапа мест
placesAddButton.addEventListener('click', () => {
  placesValidation.validityReset();

  placesForm.reset();
  placesPopup.open();
});


// Отправка формы профиля
profileForm.addEventListener('submit', (event) =>  {
  event.preventDefault();

  api.changeUserData(profileUsername.value, profileJob.value).then(res => {
    profile.setUserInfo(res);
    profile.updateUserInfo()
    profilePopup.close();
  })
    .catch((err) => {
      alert('Упс! ' + err);
    })
  profileForm.reset();
})


// Отправка формы мест
placesForm.addEventListener('submit', (event) => {
  event.preventDefault();
  places.addCard(placesTitle.value, placesLink.value);
  placesPopup.close();
  placesForm.reset();
})



/* Вызовы функций */
profileValidation.setEventListeners();
placesValidation.setEventListeners();


})();
