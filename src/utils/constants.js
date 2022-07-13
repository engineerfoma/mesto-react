const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

const formEdit = document.querySelector('.popup__form');
const formAdd = document.querySelector('.popup__form_add');
const formAvatar = document.querySelector('.popup__form_avatar');

const listContainer = document.querySelector('.list');
const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');

const inputName = document.querySelector('.popup__input_type_name');
const inputAboutMe =  document.querySelector('.popup__input_type_about-me');
const profileAvatar = document.querySelector('.profile__avatar-edit');

export { validationConfig, formEdit, formAdd, formAvatar, listContainer, profileEditBtn, cardAddBtn, inputName, inputAboutMe, profileAvatar };