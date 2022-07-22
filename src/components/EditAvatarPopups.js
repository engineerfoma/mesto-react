import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopups({ isOpen, onClose, onUpdateAvatar }) {
    const inputRef = React.useRef(null);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: inputRef.current.value
        })
    }

    return (
        <PopupWithForm title="Обновить аватар" name="avatar" buttonName="Сохранить" isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit}>
            <input
                type="url"
                id="avatar-input"
                name="fieldAvatar"
                ref={inputRef}
                placeholder="ссылка на аватар"
                className="popup__input popup__input_source-avatar"
                required
            />
            <span className="popup__error popup__error_avatar avatar-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopups;