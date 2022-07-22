import React from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopups from './EditProfilePopups.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [cards, setCards] = React.useState([]);

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null)
    }

    function handleEditAvatar() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser({ name, about }) {
        api.setUserInfo({ name, about }) 
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
                })
            .catch(err => console.log(`Ошибка: ${err}`));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards(state => state.map(c => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(state => state.filter(a => a._id !== card._id));
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }

    React.useEffect(() => {
        api.getUserInfo()
            .then(res => {
                setCurrentUser(res);
            })
            .catch(err => console.log(`Ошибка: ${err}`));
        api.getCards()
            .then(res => {
                setCards(res);
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }, [])

    return (
        <currentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatar}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <Footer />
                <EditProfilePopups isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <PopupWithForm title="Новое место" name="add-card" buttonName="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                    <div className="popup__form_item">
                        <input
                            type="text"
                            id="title-input"
                            name="fieldTitle"
                            placeholder="Название"
                            className="popup__input popup__input_title"
                            required
                            minLength="2"
                            maxLength="30"
                        />
                        <span className="popup__error popup__error_visible title-input-error"></span>
                    </div>
                    <div className="popup__form_item">
                        <input
                            type="url"
                            id="link-input"
                            name="fieldSource"
                            placeholder="Ссылка на картинку"
                            className="popup__input popup__input_source"
                            required
                        />
                        <span className="popup__error link-input-error"></span>
                    </div>
                </PopupWithForm>

                <PopupWithForm title="Вы уверены?" name="confirm" buttonName="Да" onClose={closeAllPopups} />

                <PopupWithForm title="Обновить аватар" name="avatar" buttonName="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                    <input
                        type="url"
                        id="avatar-input"
                        name="fieldAvatar"
                        placeholder="ссылка на аватар"
                        className="popup__input popup__input_source-avatar"
                        required
                    />
                    <span className="popup__error popup__error_avatar avatar-input-error"></span>
                </PopupWithForm>
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </div>
        </currentUserContext.Provider>
    );
}

export default App;
