import api from '../utils/Api.js';
import React from 'react';
import Card from './Card.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo()
            .then(res => {
                setUserName(res.name);
                setUserDescription(res.about);
                setUserAvatar(res.avatar);
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    })

    React.useEffect(() => {
        api.getCards()
            .then(res => {
                setCards(res);
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }, [])



    return (
        <main>
            <section className="profile">
                <img src={userAvatar} alt="Аватар" className="profile__avatar" />
                <div className="profile__avatar-edit" onClick={onEditAvatar}></div>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <button type="button" onClick={onEditProfile} className="profile__edit-button hover"></button>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-button hover" onClick={onAddPlace}></button>
            </section>
            <ul className="list">
                {cards.map((item, i) => {
                    return <Card card={item} key={i} onCardClick={onCardClick} />
                })}
            </ul>
        </main>
    )
}

export default Main;