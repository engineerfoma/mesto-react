import React from "react";

function Card({ card, onCardClick }) {

    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="list-element pointer" onClick={handleClick}>
            <img className="list-element__picture" src={card.link} alt={card.name} />
            <button type="button" className="list-element__trash hover"></button>
            <div className="list-element__header">
                <h2 className="list-element__title">{card.name}</h2>
                <div className="list-element__container">
                    <button type="button" className="list-element__like"></button>
                    <span className="list-element__counter-likes">{card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;