import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js'

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null)
    };

    function handleEditAvatar() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    return (
        <div className="page">
            <Header />
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatar} onCardClick={handleCardClick}/>
            <Footer />
            <PopupWithForm title="Редактировать профиль" name="profile" buttonName="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                <div className="popup__container">
                    <input
                        type="text"
                        id="name-input"
                        name="field_name"
                        placeholder="Имя"
                        className="popup__input popup__input_type_name"
                        required
                        minLength="2"
                        maxLength="40"
                    />
                    <span className="popup__error popup__error_visible name-input-error"></span>
                </div>
                <div className="popup__container">
                    <input
                        type="text"
                        id="about-me-input"
                        name="field_about_me"
                        placeholder="О себе"
                        className="popup__input popup__input_type_about-me"
                        required
                        minLength="2"
                        maxLength="200"
                    />
                    <span className="popup__error popup__error_visible about-me-input-error"></span>
                </div>
            </PopupWithForm>

            <PopupWithForm title="Новое место" name="add-card" buttonName="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                <div className="popup__container">
                    <input
                        type="text"
                        id="title-input"
                        name="field_title"
                        placeholder="Название"
                        className="popup__input popup__input_title"
                        required
                        minLength="2"
                        maxLength="30"
                    />
                    <span className="popup__error popup__error_visible title-input-error"></span>
                </div>
                <div className="popup__container">
                    <input
                        type="url"
                        id="link-input"
                        name="field_source"
                        placeholder="Ссылка на картинку"
                        className="popup__input popup__input_source"
                        required
                    />
                    <span className="popup__error link-input-error"></span>
                </div>
            </PopupWithForm>

            <PopupWithForm title="Вы уверены?" name="confirm" buttonName="Да" onClose={closeAllPopups}/>

            <PopupWithForm title="Обновить аватар" name="avatar" buttonName="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                <input
                    type="url"
                    id="avatar-input"
                    name="field_avatar"
                    placeholder="ссылка на аватар"
                    className="popup__input popup__input_source-avatar"
                    required
                />
                <span className="popup__error popup__error_avatar avatar-input-error"></span>
            </PopupWithForm>
            <ImagePopup 
            card={selectedCard} 
            onClose={closeAllPopups}/>
        </div>
    );
}

export default App;
