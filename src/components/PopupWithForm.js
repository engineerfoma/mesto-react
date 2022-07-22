function PopupWithForm({ title, name, buttonName, children, isOpen, onClose, handleSubmit }) {

    return (
        <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content popup__content_form">
                <button type="button" className="popup__close hover" onClick={onClose}></button>
                <h3 className="popup__title">{title}</h3>
                <form name={`popup${name}`} className="popup__form" onSubmit={handleSubmit} noValidate>
                    {children}
                    <button type="submit" className="popup__save">{buttonName}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;